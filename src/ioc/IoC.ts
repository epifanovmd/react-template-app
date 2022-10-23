import {
  Container as InversifyContainer,
  inject as Inject,
  injectable as Injectable,
} from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";
import shortid from "shortid";
import React from "react";

interface IIoCInterface<T> {
  readonly Tid: unique symbol;
  (): (target: any, targetKey?: string, index?: number | undefined) => void;
  useInject(): T;
  getInstance(): T;
}

const iocContainer = new InversifyContainer();

const { lazyInject } = getDecorators(iocContainer);

const instance: { [key: string]: any } = {};

function iocDecorator<TInterface>(name?: string): IIoCInterface<TInterface> {
  const _name = name || shortid();

  const tid = Symbol.for(_name) as any;

  function iocDecoratorFactory() {
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
        iocContainer.bind<TInterface>(tid).to(target);
        instance[tid] = iocContainer.get<TInterface>(tid);
      }
    };
  }

  iocDecoratorFactory.Tid = tid;

  iocDecoratorFactory.useInject = () => {
    if (typeof window === "undefined") {
      return instance[tid];
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useMemo(() => iocContainer.get<TInterface>(tid), []);
  };

  iocDecoratorFactory.getInstance = () => {
    if (typeof window === "undefined") {
      return instance[tid];
    }

    return iocContainer.get<TInterface>(tid);
  };

  return iocDecoratorFactory;
}

export { Injectable, Inject, iocDecorator };
