export interface ClientConfig {
    ServerAddress: string;
    ServerPort: number;
    ServerPassword: string | null;
    ServerUserName: string;
};
export const envconfig: ClientConfig = {
    ServerAddress: "127.0.0.1",
    ServerPassword: null,
    ServerPort: 8212,
    ServerUserName: "admin",
};

export const PrintConfig = () => {
    console.log(envconfig);
};