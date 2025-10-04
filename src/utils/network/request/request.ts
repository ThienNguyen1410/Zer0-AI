// Server side is support CORS
import { debugLog } from "../../logs/debug";
import { RequestMethod, RequestOptions, RequestRoute, RequestType } from "./types";

export const allowedRequestMethods : RequestMethod[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]

const DEFAULT_CONTENT_TYPE = "application/json"

export const customRequest = async <R = unknown, E = unknown>(route: RequestRoute, options: RequestOptions) : Promise<RequestType<R, E>> => {
    const [method, endpoint] = route.split(" ", 2) as [RequestMethod, string]

    // Debug logging - initial request info
    debugLog('customRequest | Initial request info:', {
        route,
        method,
        endpoint,
        options: {
            ...options,
            body: options.body ? '[BODY_DATA]' : undefined // Don't log full body, just indicate if present
        }
    });

    if (!allowedRequestMethods.includes(method)) {
        debugLog('customRequest | Method not allowed:', method);
        return { status: 405, error: "Method not allowed" } as RequestType<R, E>;
    }

    const {headers = {}, body, ...restOptions} = options

    const requestHeaders = new Headers()

    const { contentType = DEFAULT_CONTENT_TYPE} = headers

    // Only set Content-Type for non-GET requests to avoid CORS preflight
    if (method !== 'GET') {
        requestHeaders.set("Content-Type", contentType)
    }
    
    // Only set Accept if it's not the default to avoid CORS preflight
    if (headers.accept && headers.accept !== '*/*') {
        requestHeaders.set("Accept", headers.accept)
    }

    const requestBody = body ? JSON.stringify(body) : undefined

    const requestInit : RequestInit = {
        ...restOptions,
        method: method,
        headers: requestHeaders,
        body: requestBody,
    }

    // Debug logging - final request details
    debugLog('customRequest | Final request details:', {
        url: endpoint,
        method: method,
        headers: Object.fromEntries(requestHeaders.entries()),
        body: requestBody ? JSON.parse(requestBody) : undefined,
        requestInit: {
            ...requestInit,
            body: requestBody ? '[STRINGIFIED_BODY]' : undefined
        }
    });

    try {
        debugLog('customRequest | Making fetch request to:', endpoint);
        const response = await fetch(endpoint, requestInit);
        
        debugLog('customRequest | Response received:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            url: response.url
        });

        const jsonResponse = await response.json();
        
        debugLog('customRequest | JSON response parsed:', {
            status: response.status,
            responseData: jsonResponse
        });

        if (response.status >= 200 && response.status < 300) {
            debugLog('customRequest | Success response:', { status: response.status });
            return { status: response.status, data: jsonResponse, error: undefined } as RequestType<R, E>
        }

        debugLog('customRequest | Error response:', { 
            status: response.status, 
            error: jsonResponse.error || jsonResponse 
        });
        return { status: response.status, data: jsonResponse, error: jsonResponse.error } as RequestType<R, E>
        
    } catch (error) {
        debugLog('customRequest | Fetch error:', {
            error: error instanceof Error ? error.message : error,
            endpoint,
            method
        });
        throw error;
    }
}