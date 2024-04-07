"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def = void 0;
const commandHandler = async (cli, args) => {
    const res = await cli.get("/players");
    console.log(res);
    return 0;
};
exports.def = {
    handler: commandHandler,
    help: "show player list.",
    completer: null,
};
//# sourceMappingURL=players.js.map