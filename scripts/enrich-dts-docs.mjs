import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const targetDir = path.resolve(process.argv[2] ?? 'dist');

const isDeclarationFile = (filePath) => filePath.endsWith('.d.ts');

const readDirRecursive = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await readDirRecursive(fullPath)));
        } else {
            files.push(fullPath);
        }
    }
    return files;
};

const hasModifier = (node, modifier) => Boolean(node.modifiers?.some((value) => value.kind === modifier));

const isExportedCallable = (node) => {
    if (ts.isFunctionDeclaration(node)) {
        return hasModifier(node, ts.SyntaxKind.ExportKeyword);
    }

    if (ts.isVariableStatement(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
        return node.declarationList.declarations.some(
            (declaration) => declaration.type && ts.isFunctionTypeNode(declaration.type)
        );
    }

    if (ts.isMethodDeclaration(node) || ts.isMethodSignature(node)) {
        const parent = node.parent;
        return (
            (ts.isClassDeclaration(parent) || ts.isInterfaceDeclaration(parent)) &&
            hasModifier(parent, ts.SyntaxKind.ExportKeyword)
        );
    }

    return false;
};

const extractCallableName = (node) => {
    if (ts.isFunctionDeclaration(node) && node.name) return node.name.getText();
    if (ts.isMethodDeclaration(node) || ts.isMethodSignature(node)) {
        if (ts.isIdentifier(node.name)) return node.name.text;
        return node.name.getText();
    }
    if (ts.isVariableStatement(node)) {
        const declaration = node.declarationList.declarations.find((value) => ts.isFunctionTypeNode(value.type));
        if (!declaration) return undefined;
        return declaration.name.getText();
    }
    return undefined;
};

const extractCallableSignature = (node) => {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isMethodSignature(node)) {
        return {
            parameters: node.parameters.map((param) => param.name.getText()),
            returnType: node.type?.getText() ?? 'unknown',
        };
    }

    if (ts.isVariableStatement(node)) {
        const declaration = node.declarationList.declarations.find((value) => ts.isFunctionTypeNode(value.type));
        if (declaration && ts.isFunctionTypeNode(declaration.type)) {
            return {
                parameters: declaration.type.parameters.map((param) => param.name.getText()),
                returnType: declaration.type.type?.getText() ?? 'unknown',
            };
        }
    }

    return { parameters: [], returnType: 'unknown' };
};

const extractTrailingJsDoc = (sourceText, node) => {
    const prefix = sourceText.slice(0, node.getStart());
    const match = prefix.match(/\/\*\*[\s\S]*?\*\/\s*$/);
    return match?.[0];
};

const hasRequiredDocTags = (sourceText, node) => {
    const doc = extractTrailingJsDoc(sourceText, node);
    if (!doc) return false;
    return doc.includes('@example') && doc.includes('@remarks Auto-generated declaration contract docs.');
};

const normalizeParamName = (rawName) => rawName.replace(/^\.{3}/, '').replace(/\?$/, '');

const buildDocComment = (callableName, signature) => {
    const params = signature.parameters.map(normalizeParamName).filter(Boolean);
    const exampleInvocation = `${callableName}(${params.map((name) => `/* ${name} */`).join(', ')})`;
    const lines = [
        '*',
        ` * Contract for \`${callableName}\`.`,
        ' *',
        ' * @remarks Auto-generated declaration contract docs.',
        ' * @example',
        ' * ```ts',
        ` * const result = ${exampleInvocation};`,
        ' * ```',
    ];

    for (const param of params) {
        lines.push(` * @param ${param} Contract input for \`${callableName}\`.`);
    }

    if (signature.returnType !== 'void') {
        lines.push(` * @returns Contract result for \`${callableName}\`.`);
    }

    return lines.join('\n');
};

const enrichFile = async (filePath) => {
    const originalText = await fs.readFile(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, originalText, ts.ScriptTarget.Latest, true);

    let changed = false;

    const transformer = (context) => {
        const visit = (node) => {
            let nextNode = node;

            if (isExportedCallable(node) && !hasRequiredDocTags(originalText, node)) {
                const callableName = extractCallableName(node);
                if (callableName) {
                    const signature = extractCallableSignature(node);
                    const doc = buildDocComment(callableName, signature);
                    nextNode = ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, doc, true);
                    changed = true;
                }
            }

            return ts.visitEachChild(nextNode, visit, context);
        };

        return (node) => ts.visitNode(node, visit);
    };

    const transformed = ts.transform(sourceFile, [transformer]);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const output = printer.printFile(transformed.transformed[0]);

    transformed.dispose();

    if (changed && output !== originalText) {
        await fs.writeFile(filePath, output, 'utf8');
    }

    return changed;
};

const main = async () => {
    const stat = await fs.stat(targetDir).catch(() => undefined);
    if (!stat || !stat.isDirectory()) {
        console.error(`Declaration directory not found: ${targetDir}`);
        process.exit(1);
    }

    const files = (await readDirRecursive(targetDir)).filter(isDeclarationFile);
    let changedFiles = 0;

    for (const file of files) {
        if (await enrichFile(file)) {
            changedFiles += 1;
        }
    }

    console.log(`Enriched declaration docs in ${changedFiles} file(s).`);
};

await main();
