import { CommandDefinition } from "../common";
import { RestClient } from "../restclient";

const commandHandler = async (cli: RestClient, args: string[]) => {
    if (args.length == 0) {
        console.log("missing argument for announce command.");
        return 1;
    }
    const res = await cli.post("/announce", { message: args.join(" ") });
    console.log(res);
    return 0;
}

export const def: CommandDefinition = {
    handler: commandHandler,
    help: "broadcast message.\n  args: message",
    completer: null,
};