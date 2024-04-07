import { CommandDefinition } from "./common";
import { RestClient } from "./restclient";
import * as subcmdInfo from "./subcmd/info";
import * as subcmdSave from "./subcmd/save";
import * as subcmdMetrics from "./subcmd/metrics";
import * as subcmdPlayers from "./subcmd/players";
import * as subcmdShutdown from "./subcmd/shutdown";
import * as subcmdAnnounce from "./subcmd/announce";

export const MainCommands: { [cmdname: string]: CommandDefinition } = {};

const exit = (_: RestClient, args: string[]) => {
    process.exit(0);
};
const exitHelp = "exit this console.";


const help = async (_: RestClient, args: string[]) => {
    console.log("");
    console.log("commands:");
    Object.keys(MainCommands).sort().forEach((c) => {
        console.log(`  ${c}`);
        MainCommands[c].help.split("\n").forEach((i) => console.log(`    ${i}`));
    });
    console.log("");
    return 0;
};

const helpHelp = "show this message.";

export const globalCompleter = async (line: string) => {
    const cmds = Object.keys(MainCommands).sort();
    const hits = cmds.filter((c) => c.startsWith(line));
    
    return [hits.length ? hits : cmds, line];
};

MainCommands['exit'] = { handler: exit, help: exitHelp, completer: null };
MainCommands['help'] = { handler: help, help: helpHelp, completer: null };
MainCommands['info'] = subcmdInfo.def;
MainCommands['save'] = subcmdSave.def;
MainCommands['metrics'] = subcmdMetrics.def;
MainCommands['players'] = subcmdPlayers.def;
MainCommands['shutdown'] = subcmdShutdown.def;
MainCommands['announce'] = subcmdAnnounce.def;
