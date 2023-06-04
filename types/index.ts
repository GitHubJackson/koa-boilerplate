import { DefaultContext } from "koa";
import { IncomingMessage } from "http";

type EnhancedIncomingMessage = IncomingMessage & { [k: string]: any };

export interface ICustomContext extends DefaultContext {
  custom: string;
  request: EnhancedIncomingMessage;
}

// controller handler type
export type IControllerHandler = (ctx: ICustomContext, next?: Function) => any;
