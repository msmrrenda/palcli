"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCommands = void 0;
;
exports.MainCommands = {};
const exit = (args) => {
    process.exit(0);
};
const exitHelp = "exit this console.";
const help = (args) => {
    console.log("");
    console.log("commands:");
    Object.keys(exports.MainCommands).sort().forEach((c) => {
        console.log(`  ${c}`);
        exports.MainCommands[c].help.split("\n").forEach((i) => console.log(`    ${i}`));
    });
    return 0;
};
const helpHelp = "show this message.";
exports.MainCommands['exit'] = { handler: exit, help: exitHelp };
exports.MainCommands['help'] = { handler: help, help: helpHelp };
//# sourceMappingURL=command.js.map