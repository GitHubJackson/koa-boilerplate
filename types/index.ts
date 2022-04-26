/*
 * @Desc:
 * @Author: JacksonZhou
 * @Date: 2021/02/22
 * @LastEditTime: 2021/02/23
 */
import { DefaultContext } from "koa";
import { IncomingMessage } from "http";

type EnhancedIncomingMessage = IncomingMessage & { [k: string]: any };

export interface ICustomContext extends DefaultContext {
  custom: string;
  req: EnhancedIncomingMessage;
}

// controller handler type
export type IControllerHandler = (ctx: ICustomContext, next?: Function) => any;
