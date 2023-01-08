declare module "delivery-backend" {

    // shared between error delivery module and back end

    import { Query, Send } from 'express-serve-static-core';
    import * as express from 'express';

    export interface TypedRequest<T, U extends Query> extends express.Request{
        body: T,
        query: U
    }

    export interface TypedResponse<ResBody> extends express.Response{
        json: Send<ResBody, this>;
    }

    export interface AuthResponse {
        message: string,
        token: string | undefined
    }

    export interface AuthRequest {
        appId: string,
        appSecret: string
    }

    export interface Actions {
        target: {
            localName: string;
            id: string;
            className: string;
        },
        type: string;
    }

    export interface ErrorReportInterface {
        message: string,
        name: string,
        stack: string,
        actions: object[],
        browserVersion: string,
        timestamp: number
    }

    export interface RequestBodyInterface extends ErrorReportInterface {
        appId: string,
        sessionId: string
    }

    export type ErrorResponseType = Error & {statusCode: number};

    export interface TimestampOptions {
        format?: string,
        timezone?: string
    }

}

declare module "frontend-backend" {

    // shared between back end and front end

    export interface ErrorLogInterface {
        appId: string,
        sessionId: string,
        message: string,
        name: string,
        stack: string,
        actions: object[],
        browserVersion: string,
        timestamp: Date
    }

    export interface AdminAuthRequest {
        name: string,
        password: string,
        userId?: string
    }

    export type ViewType = 'atomic' | 'error' | 'session';

    export interface QueryInterface {
        startDate: string, 
        endDate: string, 
        sessionId: string, 
        name: string, 
        page: string, 
        limit: string, 
        view: ViewType
    }

}