import { RestClient } from "./restclient";

export interface CommandDefinition {
    handler: (client: RestClient, arg: string[]) => Promise<number>;
    help: string;
    completer: ((line: string) => string[]) | null;
};
export interface GlobalConfig {
    ServerAddress: string;
    ServerPort: number;
    ServerPassword: string | null;
    ServerUserName: string;
    ApiPrefix: string;
};

export interface CommonState {
    config: GlobalConfig;
};


