import * as readline from "node:readline/promises";
import * as envcfg from "./config";
import * as command from "./command";
import * as restclient from "./restclient";

const main = async () => {
    await tempInputConfig();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "palcli> ",
        completer: command.globalCompleter,
    });

    envcfg.PrintConfig();
    const client = restclient.init(envcfg.envconfig);

    if (await testConnection(client)) {
        console.log("server connection success.");
    } else {
        console.error("server connection failed.");
        process.exit(1);
    }

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

// ‚¿‚á‚ñ‚Æ“Ç‚Þ‚æ‚¤‚É‚µ‚½‚ç‚â‚ß‚é
const tempInputConfig = async () => {
    const tempInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
    const host = await tempInterface.question("host (default: 127.0.0.1)? ");
    if (host.trim().length > 0) {
        envcfg.envconfig.ServerAddress = host;
    }
    const port = await tempInterface.question("port (default: 8212)? ");
    if (port.trim().length > 0) {
        envcfg.envconfig.ServerPort = parseInt(port);
    }
    const pass = await tempInterface.question("pass? ");
    envcfg.envconfig.ServerPassword = pass;
    tempInterface.close();
};

const testConnection = async (cli: restclient.RestClient) => {
    const result = await cli.get('/info')
        .then((res) => {
            console.log(res);
            return true;
        }).catch((err) =>
        {
            console.error(err);
            console.error(err.errors);
            return false;
        }
    );
    return result;
};
main();
