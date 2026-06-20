import { cli } from "./cli.ts";

function main() {
    try {
        cli()
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            Deno.exit(1);
        }
        console.error("Something unexpected happen during the execution of the cli")
        Deno.exit(1)
    }
}

if (import.meta.main) main()