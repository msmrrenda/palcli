interface CommandDefinition {
    handler: (arg: string[]) => Promise<number>;
    help: string;
};

export const MainCommands: { [cmdname: string]: CommandDefinition } =
{

};
const exit = (args: string[]) => {
    process.exit(0);
};
const exitHelp = "exit this console.";


const help = async (args: string[]) => {
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

MainCommands['exit'] = { handler: exit, help: exitHelp };
MainCommands['help'] = { handler: help, help: helpHelp };
