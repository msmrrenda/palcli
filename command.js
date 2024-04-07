"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCompleter = exports.MainCommands = void 0;
const subcmdInfo = __importStar(require("./subcmd/info"));
const subcmdSave = __importStar(require("./subcmd/save"));
const subcmdMetrics = __importStar(require("./subcmd/metrics"));
const subcmdPlayers = __importStar(require("./subcmd/players"));
exports.MainCommands = {};
const exit = (_, args) => {
    process.exit(0);
};
const exitHelp = "exit this console.";
const help = async (_, args) => {
    console.log("");
    console.log("commands:");
    Object.keys(exports.MainCommands).sort().forEach((c) => {
        console.log(`  ${c}`);
        exports.MainCommands[c].help.split("\n").forEach((i) => console.log(`    ${i}`));
    });
    console.log("");
    return 0;
};
const helpHelp = "show this message.";
const globalCompleter = async (line) => {
    const cmds = Object.keys(exports.MainCommands).sort();
    const hits = cmds.filter((c) => c.startsWith(line));
    return [hits.length ? hits : cmds, line];
};
exports.globalCompleter = globalCompleter;
exports.MainCommands['exit'] = { handler: exit, help: exitHelp, completer: null };
exports.MainCommands['help'] = { handler: help, help: helpHelp, completer: null };
exports.MainCommands['info'] = subcmdInfo.def;
exports.MainCommands['save'] = subcmdSave.def;
exports.MainCommands['metrics'] = subcmdMetrics.def;
exports.MainCommands['players'] = subcmdPlayers.def;
//# sourceMappingURL=command.js.map