export type DataDto = {
    id: string;
    timestamp: string;
    action: string;
    location: string;
    target: {
        mediaType: string;
        size: number;
        digest: string;
        length: number;
        repository: string;
        tag: string;
    };
    request: {
        id: string;
        host: string;
        method: string;
        useragent: string;
    };
}