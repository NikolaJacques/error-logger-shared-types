declare module "intersection" {

    // shared between all three modules

    export interface ActionType {
        target: {
            localName: string;
            id: string;
            className: string;
        },
        type: string;
    }
    
    export interface ErrorLogType<U> {
        message: string,
        name: string,
        stack: string,
        actions: ActionType[],
        browserVersion: string,
        timestamp: U
    }
    
    export interface ExtendedErrorLogType<U> extends ErrorLogType<U> {
        appId: string,
        sessionId: string
    }

    export interface TimestampOptions {
        format?: string,
        timezone?: string
    }

}

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

    export type ErrorResponseType = Error & {statusCode: number};

}

declare module "frontend-backend" {

    // shared between back end and front end

    import { ExtendedErrorLogType, TimestampOptions } from 'intersection';

    export interface ErrorViewType {
        name: string,
        message: string,
        stack: string,
        browserVersion: string[],
        totalErrors: number,
        totalSessions: number
    }

    export interface SessionViewType {
        sessionId: string,
        timestamp: string,
        totalErrors: number,
        errors: ExtendedErrorLogType<string>[]
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
    
    export interface SuccessResponseType {message: string, logs: any[], total:number}

    type Role = 'user' | 'admin' | 'super admin';

    export interface ProjectRequest {
        name: string,
        description?: string,
        timestampOptions?: TimestampOptions
    }

}