- "All character sets need to be in UTF-8."
- "Lines need to end with LF (line feed)."
- "Indentation size needs to be 4 spaces."
- "Spaces need to be utilized for indentation instead of tabs."
- "A newline must be inserted at the end of the file."
- "Maximum line length must be 120 characters."
- "Tab width needs to be 4 spaces."
- "Trim all trailing whitespaces."
- "Ensure that lines align visually."
- "In Typescript files, continuation indent size needs to be 4 spaces."
- "Multiline array initializer expressions in Typescript must not be aligned."
- "Binary operations in Typescript across multiple lines should not be aligned."
- "Multiline chained methods in Typescript should not be aligned."
- "Extends lists in Typescript across multiple lines should not be aligned."
- "For loops in Typescript across multiple lines should be aligned."
- "Parameters in Typescript across multiple lines should be aligned."
- "Calls in Typescript across multiple lines should not be aligned."
- "Multiline ternary operations in Typescript should not be aligned."
- "Object properties and var statements in Typescript should not be aligned."
- "Binary operation signs in Typescript need to be placed on the next line."
- "Insert blank lines after imports and around classes, functions, and methods in Typescript."
- "For 'if' and 'for loops' in Typescript, always use braces."
- "Avoid placing 'catch' parentheses on a new line in Typescript."
- "In Typescript, place the chained call dot on a new line."
- "Remove trailing comma in Typescript."
- "Union types, binary operations, ternary operations and var declarations in Typescript need to be wrapped on every
- item."
- "Binary operations, call parameters, for statements, imports, method parameters, object literals, object types, and
- union types need to be split into lines when wrapped in Typescript."
- "Spaces after colons, commas, optional parameters, and generator mults are required in Typescript."
- "Ensure spaces are present around all operators in Typescript."
- "Spaces should not be utilized within parentheses but should be utilised within object literal braces in Typescript."
- "Spaces need to be utilised within array initializer brackets in Typescript."
- "Indent size for JSON files needs to be 2."
- "In JSON, an array wrapping needs to be split into lines."
- "Avoid keeping blank lines in code for JSON."
- "Indents on empty lines should not be maintained in JSON."
- "Trailing commas in JSON need to be removed."
- "Object wrapping in JSON needs to be split into lines."
- "Avoid alignment of properties in JSON."
- "Space needs to be introduced after colon and comma in JSON."
- "Do not introduce space before colon or comma in JSON."
- "A new line needs to be inserted after left brace/array initializer in TypeScript."
- "Right brace/array initializer in TypeScript needs to be on a new line."
- "Array initializer wrap should be applied to every item in TypeScript."
- "Avoid 'else' on a new line in TypeScript."
- "Extends keyword wrap in TypeScript needs to be split into lines."
- "Import sort members and module name in TypeScript need to be set in order."
- "Spaces are required around dots in the rest parameter in TypeScript."
- "Explicit types for vars fields, function returns, and function expression returns in TypeScript need to be set."
- "Space before async arrow left parentheses in TypeScript is required."
- "Space before function left parentheses and class left brace in TypeScript is desirable."
- "Prefer 'AS' for type casting in TypeScript."
- "Space is required before method call parentheses in TypeScript."
- "Avoid space before comma in TypeScript."
- "Space before Method Left Brace needs to be utilised in TypeScript."
- "Space before Switch Parentheses is necessary in TypeScript."
- "Space before Catch Left Brace is required in TypeScript."
- "Utilize space before Catch Parentheses in TypeScript."
- "Space before Catch Keyword is necessary in TypeScript."
- "Make sure to use space before ASync Arrow LeftParen in TypeScript."
- "Make sure to use space before Type Colon in TypeScript."
- "Avoid space before Property Colon in TypeScript."
- "Utilize the space before Colon in TypeScript."
- "Always prefer 'import type' over 'import' when importing in TypeScript."
- "Always use 'public' modifier in TypeScript."
- "Always use property prefix."
- "Adopt the camelCase convention for naming functions. Ensure the names are clear and descriptive of the function's
- purpose."
- "Enforce Single Responsibility Principle for every function. Make sure each function performs one task only."
- "Maintain brevity for functions. Limit each function to about 10-20 lines."
- "Avoid using too many input parameters for functions. Try to limit input arguments to 3-4. If there are more, consider
- passing an object."
- "Apply early exits in functions. If a function fails to meet its purpose due to unsatisfied inputs, ensure it returns
- or throws an error early."
- "Avoid side effects within functions. Don't let a function modify any states or objects beyond its scope – it should
- only depend on input arguments to produce its output."
- "Implement descriptive variable names within functions."
- "Address potential errors with measures such as try/catch blocks, error returns, or error callback functions"
- "If you observe any repeated code, create a new function. If a function becomes too complex, decompose it into smaller
- ones."
- "Use PascalCase convention for naming classes. Make sure that the names are clear, relevant, and communicate the
- object's purpose."
- "Adhere to the Single Responsibility Principle. Each class should have one responsibility or task."
- "Encapsulate data that changes for the same reasons. Variables that are often changed together should be placed in the
- same class to improve data hiding and cohesion."
- "Implement encapsulation and data hiding. Keep instance variables protected and expose a minimal necessary interface
- to the outside world."
- "Write methods that operate on an instance's variables. Try to minimize the number of methods that access instance
- variables of other classes."
- "Ensure classes are immutable wherever possible. An immutable object remains the same across its entire lifecycle,
- improving readability and runtime efficiency."
- "Use meaningful, descriptive variable and method names. This makes your classes more readable and self-explanatory."
- "Provide a clear, public API for your classes. It should be clear what methods can be called, what parameters they
- require, and what they will return."
- "Prefer composition over inheritance. Composition provides better flexibility over inheritance. Avoid deep inheritance
- trees."
- "Prefer explicit types over implicit types: Wherever possible, explicitly define the type of variables. This makes the
- code more readable and robust to changes."
- "Use PascalCase for type names: Conventional in many programming communities, PascalCase ensures your types are easily
- distinguished."
- "Avoid using any type: The any type is a powerful tool in TypeScript for working with dynamic content, but regular use
- can undermine the benefits of type safety.
- "Use the unknown type for truly unknown types: If you're not sure what type a variable will be, use unknown rather
- than any. This forces you to do type-checking before performing any actions on the variable."
- "Use type guards for runtime type-checking: Type guards are a way to check the type of an object within a conditional
- statement. Use these to ensure your code is working with the correct types."
- "Create reusable type definitions: If the same type structure is used in multiple places, create a type definition for
- it."
- "Use interface to describe object structure: TypeScript's interface keyword allows for powerful OOP techniques."
- "Use type aliases for complex or compound types: If a type involves unions, intersections, or other complex
- structures, use a type alias to simplify."
- "Output parameters should always be defined: Make sure to always define the type of return/output parameter of a
- function."
- "Arrays and objects should have types defined: Array items and Object properties must have their types clearly
- defined."
- "Use clear and understandable names: Package or module names should reflect their purpose and functionality. It should
- be descriptive and specific to its function."
- "Keep responsibilities focused: Each package or module should focus on one aspect of functionality. This is in line
- with the “Single Responsibility Principle."
- "Keep your public API minimal: Only expose the functions that external code needs to call. Everything else should be
- kept private."
- "Keep descriptions clear and concise: Each JSDoc comment should begin with a clear and concise description of what the
- function, class, method, or variable does."
- "Use @param for parameters: Arguments or parameters of a function could be described using @param. However, you don't
- need to specify types here as TypeScript can handle it."
- "Use @return or @returns for describing the return value: Utilize these tags to explain the output without specifying
- types."
- "Use @example to illustrate use cases: This tag can be used to give an example of how to use a function or method."
- "Inherit documentation using @inheritdoc: This is useful when extending classes or implementing interfaces."
- "Remove type annotations from JSDoc: TypeScript will add type information obtained from its type system to JSDoc
- information. Thereby, no need to duplicate this by adding it manually in the JSDoc comments."
- "Keep the comments up-to-date: Every time you change the behavior of an entity, update the corresponding JSDoc
- comment."
- "Leftover TODOs in the code should be handled."
- "Remove any console.log statements."
- "Name Test Files Descriptively: Adopt the .spec.ts extension and maintain a corresponding filename to the source
- file being tested, and place the test files in the same directory as your source code to ensure that new code is
- being tested promptly."
- "Describe what Your Test Cases Cover: Use understandable and clear language for both the describe and it blocks to
- specify what function is being tested and what the expected outcome is."
- "Cover One Aspect in Each Test: While writing tests, make sure each test covers only one aspect of the functionality.
- Multiple assertions can be made but they should be testing the same thing."
- "Ensure Test Cases Are Independent: Write tests that are independent and can be executed in any order. Each test
- should not rely on other tests."
- "Avoid Duplication of Logic in Tests: Keep your tests DRY (Don't Repeat Yourself) but don't over abstract that it
- makes the tests hard to understand or follow."
- "Perform Testing for Edge Cases: Write separate tests for edge cases where the function behaves differently."
- "Focus on Functionality, not Implementation: Verify the functionality provided by the code, not its internal
- implementation, while testing."
- "Mock External Dependencies: Mock out external modules and dependencies to ensure each test is isolated and only
- testing one thing."
- "Use beforeEach and afterEach for test Setup and Cleanup"
- "Ensure Self-Documenting Code: Aim to make your code self-explanatory through clear naming and structure. The less
- time a developer has to spend understanding the code, the better."
- "Follow the YAGNI Principle: 'You aren't gonna need it' is a principle that prevents developers from adding
- functionality until it is necessary. This can help keep your codebase lean and simple."
- "Externalizing User-visible Strings: Ensuring all user-facing texts (such as messages, labels, and instructions) are
- sourced from external resource files. This makes it easier to update or translate them without having to modify the
- codebase."
- "Avoiding Concatenation of Translated Strings: Concatenation might change the meaning of a sentence when it is
- translated to another language due to differences in grammar or sentence structure. Instead, use templates or
- positional parameters."
