import { UseXiSelf } from "./interfaces";

function XiWrap(self: UseXiSelf, func: () => any) {
  self.setSuccess(false);
  try {
    self.setIsLoading(true);
    self.setError(null);
    self.setData(null);

    const res = func();

    self.setSuccess(true)
    self.setIsLoading(false);
    self.setData(res);
    return res;
  } catch (e: any) {
    self.setIsLoading(false);
    self.setError(e);
    self.setData(null);
  }
}

/**
 * Marks a service as injectable and configures all it's modules to be wrapped.
 * @type decorator
 * @usage ```@XiInjectable()```
 */
export function XiInjectable() {
  return function (target: any) {
    const originalMethods = Object.getOwnPropertyNames(target.prototype).filter((method) => method !== 'constructor');

    originalMethods.forEach((methodName) => {
      const originalMethod = target.prototype[methodName];
      const shouldWrap = target.prototype[`${methodName}_XiWrap`] !== false;

      if (shouldWrap) {
        target.prototype[methodName] = function (...args: any[]) {
          console.log(`Method ${methodName} called with message`);
          return XiWrap(this.props.self, () => originalMethod.apply(this, args));
        };
      } else {
        target.prototype[methodName] = function (...args: any[]) {
          return originalMethod.apply(this, args);
        };
      }
    });
  }
}

/**
 * Marks a method as not a Xaxi method, therefore it doesn't wrap it.
 * @returns 
 */
export function XiUnwrap() {
  return function (target: any, propertyKey: string) {
    target[`${propertyKey}_XiWrap`] = false;
  }
}
