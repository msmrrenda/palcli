import { GlobalConfig } from "./interface";

export const envconfig: GlobalConfig = {
    ServerAddress: "127.0.0.1",
    ServerPassword: null,
    ServerPort: 8212,
    ServerUserName: "admin",
    ApiPrefix: "/v1/api",
};

export const PrintConfig = () => {
    console.log(envconfig);
};