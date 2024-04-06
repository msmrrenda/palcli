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
const readline = __importStar(require("readline"));
const envcfg = __importStar(require("./config"));
const command = __importStar(require("./command"));
envcfg.PrintConfig();
console.log('palcli ready');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "palcli> ",
});
rl.prompt();
rl.on('line', (line) => {
    var _a;
    const args = line.trim().split(/\s+/);
    const cmd = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (cmd != null) {
        if (command.MainCommands[cmd] != null) {
            command.MainCommands[cmd].handler(args);
            console.log();
        }
        else {
            console.log(`unknown command: ${cmd}`);
            console.log();
        }
    }
    rl.prompt();
});
//# sourceMappingURL=app.js.map