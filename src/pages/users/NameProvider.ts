import { iocDecorator } from "../../ioc";

export const IProvider = iocDecorator<IProvider>();

export interface IProvider {
  provide(): string;
}

@IProvider()
export class NameProvider implements IProvider {
  provide() {
    return "Users table";
  }
}
