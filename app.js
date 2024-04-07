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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline/promises"));
const envcfg = __importStar(require("./config"));
const command = __importStar(require("./command"));
const restclient = __importStar(require("./restclient"));
const main = async () => {
    var _a, e_1, _b, _c;
    var _d;
    await tempInputConfig();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "palcli> ",
        completer: command.globalCompleter,
    });
    envcfg.PrintConfig();
    const client = restclient.init(envcfg.envconfig);
    if (await testConnection(client)) {
        console.log("server connection success.");
    }
    else {
        console.error("server connection failed.");
        process.exit(1);
    }
    console.log('palcli ready');
    rl.prompt();
    try {
        for (var _e = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), _a = rl_1_1.done, !_a; _e = true) {
            _c = rl_1_1.value;
            _e = false;
            const line = _c;
            const args = line.trim().split(/\s+/);
            const cmd = (_d = args.shift()) === null || _d === void 0 ? void 0 : _d.toLowerCase();
            if (cmd != null) {
                if (command.MainCommands[cmd] != null) {
                    await command.MainCommands[cmd].handler(client, args).catch((reason) => {
                        console.error('command execution failure:');
                        console.error(reason);
                    });
                }
                else {
                    console.log(`unknown command: ${cmd}`);
                }
            }
            rl.prompt();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = rl_1.return)) await _b.call(rl_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    ;
};
// �����Ɠǂނ悤�ɂ������߂�
const tempInputConfig = async () => {
    const tempInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
    const host = await tempInterface.question("host (default: 127.0.0.1)? ");
    if (host.trim().length > 0) {
        envcfg.envconfig.ServerAddress = host;
    }
    const port = await tempInterface.question("port (default: 8212)? ");
    if (port.trim().length > 0) {
        envcfg.envconfig.ServerPort = parseInt(port);
    }
    const pass = await tempInterface.question("pass? ");
    envcfg.envconfig.ServerPassword = pass;
    tempInterface.close();
};
const testConnection = async (cli) => {
    const result = await cli.get('/info')
        .then((res) => {
        console.log(res);
        return true;
    }).catch((err) => {
        console.error(err);
        console.error(err.errors);
        return false;
    });
    return result;
};
main();
//# sourceMappingURL=app.js.map