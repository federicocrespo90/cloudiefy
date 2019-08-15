export interface ErrorInside {
    code: number;
    message: string;

}
export interface Error {
    error: ErrorInside;
}

export interface IHeaders {
    lazyInit: any;
    lazyUpdate: any;
    normalizedNames: any;
}

export interface IError {
    error: Error;
    headers: IHeaders;
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
}


