import * as readline from "readline";
import * as envcfg from "./config";
import * as command from "./command";


envcfg.PrintConfig();
console.log('palcli ready');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "palcli> ",
});

rl.prompt();
rl.on('line', (line) => {
    const args = line.trim().split(/\s+/);
    const cmd = args.shift()?.toLowerCase();

    const handler = cmd ? command.MainCommands[cmd].handler : command.UnknownCommandHandler;
    handler(args);
    rl.prompt();
});
