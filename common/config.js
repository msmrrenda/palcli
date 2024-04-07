"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintConfig = exports.envconfig = void 0;
exports.envconfig = {
    ServerAddress: "127.0.0.1",
    ServerPassword: null,
    ServerPort: 8212,
    ServerUserName: "admin",
    ApiPrefix: "/v1/api",
};
const PrintConfig = () => {
    console.log(exports.envconfig);
};
exports.PrintConfig = PrintConfig;
//# sourceMappingURL=config.js.map