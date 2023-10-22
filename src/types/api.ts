import { Request, Response } from 'express';

export interface Req extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface Res extends Response {
  user?: {
    id: string;
    email: string;
  };
}
