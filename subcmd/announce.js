"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def = void 0;
const commandHandler = async (cli, args) => {
    if (args.length == 0) {
        console.log("missing argument for announce command.");
        return 1;
    }
    const res = await cli.post("/announce", { message: args.join(" ") });
    console.log(res);
    return 0;
};
exports.def = {
    handler: commandHandler,
    help: "broadcast message.\n  args: message",
    completer: null,
};
//# sourceMappingURL=announce.js.map