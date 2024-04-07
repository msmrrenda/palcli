import { CommandDefinition } from "../common";
import { RestClient } from "../restclient";

const commandHandler = async (cli: RestClient, args: string[]) => {
    const res = await cli.post("/save", {});
    console.log(res);
    return 0;
}

export const def: CommandDefinition = {
    handler: commandHandler,
    help: "save the world.",
    completer: null,
};