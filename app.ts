import * as readline from "node:readline/promises";
import * as envcfg from "./config";
import * as command from "./command";


envcfg.PrintConfig();
console.log('palcli ready');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "palcli> ",
});

const main = async () => {
    rl.prompt();
    for await (const line of rl) { 
        const args = line.trim().split(/\s+/);
        const cmd = args.shift()?.toLowerCase();

        if (cmd != null) {
            if (command.MainCommands[cmd] != null) {
                await command.MainCommands[cmd].handler(args);
            } else {
                console.log(`unknown command: ${cmd}`);
            }
        }
        rl.prompt();
    };
};

main();
