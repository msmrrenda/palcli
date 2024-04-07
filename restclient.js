"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const axios_1 = __importDefault(require("axios"));
;
const init = (globalConfig) => {
    const cfg = globalConfig;
    const baseURL = new URL(cfg.ApiPrefix, `http://${cfg.ServerAddress}:${cfg.ServerPort}`).toString();
    console.log(baseURL);
    const reqopt = {
        baseURL,
    };
    if (cfg.ServerPassword != null) {
        reqopt.auth = {
            username: cfg.ServerUserName,
            password: cfg.ServerPassword,
        };
    }
    const ai = axios_1.default.create(reqopt);
    const get = async (url) => {
        return await ai.get(url).then((res) => { return res.data; });
    };
    const post = async (url, data) => {
        return await ai.post(url, data).then((res) => { return res.data; });
    };
    const put = async (url, data) => {
        return await ai.put(url, data).then((res) => { return res.data; });
    };
    const client = {
        get,
        post,
        put,
    };
    return client;
};
exports.init = init;
//# sourceMappingURL=restclient.js.map