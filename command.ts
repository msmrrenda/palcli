interface CommandDefinition {
    handler: (arg: string[]) => number;
    help: string;
};

export const MainCommands: { [cmdname: string]: CommandDefinition } =
{

};
const exit = (args: string[]) => {
    process.exit(0);
};
const exitHelp = "exit this console.";


const help = (args: string[]) => {
    console.log("commands:");
    console.log("");
    Object.keys(MainCommands).sort().forEach((c) => {
        console.log(`  ${c}`);
        MainCommands[c].help.split("\n").forEach((i) => console.log(`    ${i}`));
        console.log("");
    });
    return 0;
};

const helpHelp = "show this message.";

export const UnknownCommandHandler = (args: string[]) => {
    return 0;
};
MainCommands['exit'] = { handler: exit, help: exitHelp };
MainCommands['help'] = { handler: help, help: helpHelp };
