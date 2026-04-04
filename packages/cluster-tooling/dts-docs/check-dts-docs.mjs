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

const extractSignature = (node) => {
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

const normalizeParamName = (rawName) => rawName.replace(/^\.{3}/, '').replace(/\?$/, '');

const getDocBlock = (sourceText, node) => {
    const prefix = sourceText.slice(0, node.getStart());
    const match = prefix.match(/\/\*\*[\s\S]*?\*\/\s*$/);
    return match?.[0];
};

const validateFile = async (filePath) => {
    const sourceText = await fs.readFile(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
    const failures = [];

    const visit = (node) => {
        if (isExportedCallable(node)) {
            const callableName = extractCallableName(node);
            if (callableName) {
                const signature = extractSignature(node);
                const doc = getDocBlock(sourceText, node);
                const location = `${path.relative(process.cwd(), filePath)}:${
                    sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1
                }`;

                if (!doc) {
                    failures.push(`${location} ${callableName} is missing TSDoc.`);
                } else {
                    if (!doc.includes('@example')) {
                        failures.push(`${location} ${callableName} is missing @example.`);
                    }
                    if (!doc.includes('@remarks')) {
                        failures.push(`${location} ${callableName} is missing @remarks.`);
                    }

                    for (const paramName of signature.parameters.map(normalizeParamName).filter(Boolean)) {
                        if (!doc.includes(`@param ${paramName}`)) {
                            failures.push(`${location} ${callableName} is missing @param ${paramName}.`);
                        }
                    }

                    if (signature.returnType !== 'void' && !doc.includes('@returns')) {
                        failures.push(`${location} ${callableName} is missing @returns.`);
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return failures;
};

const main = async () => {
    const stat = await fs.stat(targetDir).catch(() => undefined);
    if (!stat || !stat.isDirectory()) {
        console.error(`Declaration directory not found: ${targetDir}`);
        process.exit(1);
    }

    const files = (await readDirRecursive(targetDir)).filter(isDeclarationFile);
    const failures = [];

    for (const file of files) {
        failures.push(...(await validateFile(file)));
    }

    if (failures.length > 0) {
        console.error('Declaration documentation check failed:');
        for (const failure of failures) {
            console.error(`- ${failure}`);
        }
        process.exit(1);
    }

    console.log(`Declaration documentation check passed for ${files.length} file(s).`);
};

await main();
