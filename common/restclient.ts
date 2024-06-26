import path from "node:path";
import { GlobalConfig } from "./interface";
import axios, { Axios, AxiosRequestConfig } from 'axios';

export interface RestClient {
    get: (url: string) => Promise<any>;
    post: (url: string,params: any) => Promise<any>;
};

export const init = (globalConfig: GlobalConfig) => {
    const cfg = globalConfig;
    const baseURL = new URL(cfg.ApiPrefix,`http://${cfg.ServerAddress}:${cfg.ServerPort}`).toString();
    const reqopt: AxiosRequestConfig = {
        baseURL,
    };
    if (cfg.ServerPassword != null) {
        reqopt.auth = {
            username: cfg.ServerUserName,
            password: cfg.ServerPassword,
        };
    }
    const ai = axios.create(reqopt);
        
    const get = async (url: string) => {
        return await ai.get(url).then((res) => { return res.data; });
    };

    const post = async (url: string, data: any) => {
        return await ai.post(url, data).then((res) => { return res.data; });
    };

    const client: RestClient = {
        get,
        post,
    };
    return client;
}