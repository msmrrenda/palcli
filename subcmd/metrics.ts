import { CommandDefinition } from "../common/interface";
import { RestClient } from "../common/restclient";

const commandHandler = async (cli: RestClient, args: string[]) => {
    const res = await cli.get("/metrics");
    console.log(res);
    return 0;
}

export const def: CommandDefinition = {
    handler: commandHandler,
    help: "show server metrics.",
    completer: null,
};