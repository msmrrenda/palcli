"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def = void 0;
const commandHandler = async (cli, args) => {
    const res = await cli.get("/metrics");
    console.log(res);
    return 0;
};
exports.def = {
    handler: commandHandler,
    help: "show server metrics.",
    completer: null,
};
//# sourceMappingURL=metrics.js.map