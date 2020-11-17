export declare type ParamData = Record<string, unknown> | string | number;
export declare const Request: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Response: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Ctx: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Next: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Body: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Query: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Param: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Headers: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Session: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const File: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Files: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Ip: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Req: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
export declare const Res: (data?: string | number | Record<string, unknown> | undefined) => ParameterDecorator;
