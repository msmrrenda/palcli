"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def = void 0;
const commandHandler = async (cli, args) => {
    const res = await cli.post("/save", {});
    console.log(res);
    return 0;
};
exports.def = {
    handler: commandHandler,
    help: "save the world.",
    completer: null,
};
//# sourceMappingURL=save.js.map