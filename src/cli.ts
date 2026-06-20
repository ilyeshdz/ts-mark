import { tokenize } from "./lexer.ts";

export function cli() {
    const [input] = Deno.args;

    if (!input) {
        throw new Error("You didn't specify the markdown file")
    }

    try {
        const fileContent = Deno.readTextFileSync(input);

        const tokens = tokenize(fileContent);

        console.log(tokens)
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            throw new Error("The file was not found in your current directory")
        } else if (err instanceof Deno.errors.NotCapable) {
            throw new Error("You don't have the permission required to read the file specifed")
        }
    }
}