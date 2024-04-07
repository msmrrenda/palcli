import * as readline from "node:readline/promises";
import * as envcfg from "./common/config";
import * as command from "./common/command";
import * as restclient from "./common/restclient";
import Writable from "node:stream";

const main = async () => {
    let client;
    while (true) {
        await inputServerConfig();
        client = restclient.init(envcfg.envconfig);
        if (await testConnection(client)) {
            console.log("server connection success.");
            break;
        } else {
            console.error("server connection failed.");
        }
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "palcli> ",
        completer: command.globalCompleter,
    });

    console.log('palcli ready');
    rl.prompt();
    for await (const line of rl) { 
        const args = line.trim().split(/\s+/);
        const cmd = args.shift()?.toLowerCase();

        if (cmd != null) {
            if (command.MainCommands[cmd] != null) {
                await command.MainCommands[cmd].handler(client, args).catch((reason) => {
                    console.error('command execution failure:');
                    console.error(reason);
                });
            } else {
                console.log(`unknown command: ${cmd}`);
            }
        }
        rl.prompt();
    };
};

const inputServerConfig = async () => {
    const tempInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
    const host = await tempInterface.question(`host (default: ${envcfg.envconfig.ServerAddress})? `);
    if (host.length > 0) {
        envcfg.envconfig.ServerAddress = host;
    }
    const port = await tempInterface.question(`port (default: ${envcfg.envconfig.ServerPort.toString()})? `);
    if (port.length > 0) {
        envcfg.envconfig.ServerPort = parseInt(port);
    }
    tempInterface.close();
    const passInterface = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
    process.stdin.setRawMode(true);
    const pass = await passInterface.question("pass? ");
    if (pass.length > 0) {
        envcfg.envconfig.ServerPassword = pass;
    } else {
        envcfg.envconfig.ServerPassword = null;
    }
    process.stdin.setRawMode(false);
    process.stdout.write("\n");
    passInterface.close();
};

const testConnection = async (cli: restclient.RestClient) => {
    const result = await cli.get('/info')
        .then((res) => {
            console.log(res);
            return true;
        }).catch((err) =>
        {
            console.error(err.message);
            return false;
        }
    );
    return result;
};
main();
