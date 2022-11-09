import {
  Container as InversifyContainer,
  inject as Inject,
  injectable as Injectable,
} from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";
import shortid from "shortid";
import React from "react";
import { getInitialData } from "../common";

interface IIoCInterface<T> {
  readonly Tid: string;

  (options?: { inSingleton?: boolean }): (
    target: any,
    targetKey?: string,
    index?: number | undefined,
  ) => void;

  useInject(): T;

  getInstance(): T;
  getInitialData: <P>() => P;
}

const iocContainer = new InversifyContainer();

const { lazyInject } = getDecorators(iocContainer);

const instance: { [key: string]: any } = {};

function iocDecorator<TInterface>(name?: string): IIoCInterface<TInterface> {
  const tid = name || shortid();

  function iocDecoratorFactory(options?: { inSingleton?: boolean }) {
    return function iocDecorator(
      target: any,
      targetKey?: string,
      index?: number | undefined,
    ) {
      if (index !== undefined) {
        // При использовании на параметре конструкра
        Inject(tid)(target, targetKey!, index);
      } else if (targetKey) {
        // При использовании на поле класса
        lazyInject(tid)(target, targetKey);
      } else {
        // При использовании на классе
        Injectable()(target);
        if (options?.inSingleton) {
          iocContainer.bind<TInterface>(tid).to(target).inSingletonScope();
        } else {
          iocContainer.bind<TInterface>(tid).to(target);
        }
        instance[tid] = iocContainer.get<TInterface>(tid);
      }
    };
  }

  iocDecoratorFactory.Tid = tid;
  iocDecoratorFactory.getInitialData = () => getInitialData(tid);

  iocDecoratorFactory.useInject = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useMemo(() => iocContainer.get<TInterface>(tid), []);

  iocDecoratorFactory.getInstance = () => instance[tid];

  return iocDecoratorFactory;
}

export { Injectable, Inject, iocDecorator };
