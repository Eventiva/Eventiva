import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const isDeclarationFile = (filePath) => filePath.endsWith('.d.ts');

const walk = (dir) => {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(fullPath));
        } else {
            files.push(fullPath);
        }
    }
    return files;
};

const hasModifier = (node, modifier) =>
    Boolean(node.modifiers?.some((value) => value.kind === modifier));

const getJsDoc = (sourceText, node) => {
    const prefix = sourceText.slice(0, node.getStart());
    const match = prefix.match(/\/\*\*[\s\S]*?\*\/\s*$/);
    return match?.[0] ?? '';
};

const normalizeParamName = (value) => value.replace(/^\.\.\./, '').replace(/\?$/, '');

const pushCallable = (target, sourceText, sourceFile, idSuffix, node, parameters, returnType) => {
    const doc = getJsDoc(sourceText, node);
    const paramTags = (doc.match(/@param\s+([A-Za-z0-9_]+)/g) ?? []).map((line) =>
        line.replace('@param', '').trim()
    );
    target.push({
        id: idSuffix,
        parameters: parameters.map(normalizeParamName).filter(Boolean),
        returnType,
        hasExample: doc.includes('@example'),
        hasRemarks: doc.includes('@remarks'),
        hasReturns: doc.includes('@returns'),
        paramTags,
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
    });
};

const parseCallables = (absolutePath, repoRoot) => {
    const sourceText = fs.readFileSync(absolutePath, 'utf8');
    const sourceFile = ts.createSourceFile(absolutePath, sourceText, ts.ScriptTarget.Latest, true);
    const relativeFile = path.relative(repoRoot, absolutePath).replaceAll('\\', '/');
    const callables = [];

    const visit = (node) => {
        if (ts.isFunctionDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword) && node.name) {
            pushCallable(
                callables,
                sourceText,
                sourceFile,
                `${relativeFile}#${node.name.text}`,
                node,
                node.parameters.map((param) => param.name.getText()),
                node.type?.getText() ?? 'unknown'
            );
        }

        if (ts.isVariableStatement(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
            for (const declaration of node.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name) && declaration.type && ts.isFunctionTypeNode(declaration.type)) {
                    pushCallable(
                        callables,
                        sourceText,
                        sourceFile,
                        `${relativeFile}#${declaration.name.text}`,
                        node,
                        declaration.type.parameters.map((param) => param.name.getText()),
                        declaration.type.type?.getText() ?? 'unknown'
                    );
                }
            }
        }

        if (ts.isClassDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword) && node.name) {
            for (const member of node.members) {
                if (ts.isMethodDeclaration(member) && member.name) {
                    if (
                        hasModifier(member, ts.SyntaxKind.PrivateKeyword) ||
                        hasModifier(member, ts.SyntaxKind.ProtectedKeyword)
                    ) {
                        continue;
                    }
                    const methodName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
                    pushCallable(
                        callables,
                        sourceText,
                        sourceFile,
                        `${relativeFile}#${node.name.text}.${methodName}`,
                        member,
                        member.parameters.map((param) => param.name.getText()),
                        member.type?.getText() ?? 'unknown'
                    );
                }
            }
        }

        if (ts.isInterfaceDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
            for (const member of node.members) {
                if (ts.isMethodSignature(member) && member.name) {
                    const methodName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
                    pushCallable(
                        callables,
                        sourceText,
                        sourceFile,
                        `${relativeFile}#${node.name.text}.${methodName}`,
                        member,
                        member.parameters.map((param) => param.name.getText()),
                        member.type?.getText() ?? 'unknown'
                    );
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return callables;
};

export const collectProjectCallables = (projectRoot, distPrefixes) => {
    const findRepoRoot = (startDir) => {
        let current = path.resolve(startDir);
        while (true) {
            if (fs.existsSync(path.join(current, 'nx.json')) && fs.existsSync(path.join(current, 'dist'))) {
                return current;
            }
            const parent = path.dirname(current);
            if (parent === current) {
                return path.resolve(startDir);
            }
            current = parent;
        }
    };

    const repoRoot = findRepoRoot(projectRoot);
    const distDir = path.join(repoRoot, 'dist');
    const declarationFiles = walk(distDir).filter(isDeclarationFile);
    const matched = declarationFiles.filter((absolutePath) => {
        const relative = path.relative(repoRoot, absolutePath).replaceAll('\\', '/');
        return distPrefixes.some((prefix) => relative.startsWith(prefix));
    });

    const callables = matched.flatMap((filePath) => parseCallables(filePath, repoRoot));
    return callables.sort((a, b) => a.id.localeCompare(b.id));
};

export const loadCoverageManifest = (manifestPath) => {
    const content = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(content);
};

export const computeCoverage = (callables, manifest) => {
    const callableIds = new Set(callables.map((entry) => entry.id));
    const manifestIds = new Set((manifest.entries ?? []).map((entry) => entry.id));
    const uncovered = [...callableIds].filter((id) => !manifestIds.has(id)).sort();
    const stale = [...manifestIds].filter((id) => !callableIds.has(id)).sort();
    return { uncovered, stale };
};
