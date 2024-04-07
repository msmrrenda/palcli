import { CommandDefinition } from "../common";
import { RestClient } from "../restclient";

const commandHandler = async (cli: RestClient, args: string[]) => {
    const res = await cli.get("/info");
    console.log(res);
    return 0;
}

export const def: CommandDefinition = {
    handler: commandHandler,
    help: "show server info.",
    completer: null,
};