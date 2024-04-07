import { CommandDefinition } from "../common";
import { RestClient } from "../restclient";

interface ShutdownCommandParams {
    waittime: number | null;
    message: string | null;
};
const commandHandler = async (cli: RestClient, args: string[]) => {
    const params: ShutdownCommandParams = {
        waittime: null,
        message: null,
    };

    const time = args.shift();
    if (time != null) { 
        params.waittime = parseInt(time);
    }
    if (args.length > 0) {
        params.message = args.join(" ");
    }
    const res = await cli.post("/shutdown", params);
    console.log(res);
    return 0;
}

export const def: CommandDefinition = {
    handler: commandHandler,
    help: "shutdown server.\n  args: time message",
    completer: null,
};