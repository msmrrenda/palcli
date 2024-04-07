"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def = void 0;
;
const commandHandler = async (cli, args) => {
    const params = {
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
};
exports.def = {
    handler: commandHandler,
    help: "shutdown server.\n  args: time message",
    completer: null,
};
//# sourceMappingURL=shutdown.js.map