export type RequestMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
type Route = string
export type RequestRoute =  `${RequestMethod} ${Route}`

export type RequestHeaders = {
    contentType?: string,
    authorization?: string,
    accept?: string,
    'user-agent'?: string,
}

export type RequestOptions = Omit<RequestInit, "headers" | "body"> & {
    headers?: RequestHeaders,
    body?: BodyInit,
}

/**
 * Represents the result of an API request
 * @template S - Type of successful response data
 * @template E - Type of error response
 */
export type RequestType<S = unknown, E = Object> = 
{
    status: Response["status"],
    error: undefined,
    data: S,
} | {
    status: Response["status"],
    error: E,
    data: undefined,
}
