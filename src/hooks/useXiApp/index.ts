import { IUseXi, UseXiSelf } from '../../helpers/interfaces';
import axios, { AxiosInstance } from 'axios';
import { XiService } from '../../helpers/XiService';
import { create } from 'zustand';

/**
 * Classic counter example to help understand the flow of this npm package
 *
 * @param    {number} initialValue
 *           initial counter value
 *
 * @return   {Object}
 *           object with count and methods
 *
 * @property {number} count
 *           The current count state
 *
 * @property {()=>void} increment
 *           the increment function
 *
 * @property {()=>void} decrement
 *           the decrement function
 *
 * @property {()=>void} reset
 *           the reset function
 *
 * @example
 *   const ExampleComponent = () => {
 *     const { count, increment, reset, decrement } = useCounter();
 *
 *     return (
 *       <>
 *         <button onClick={increment}>Increment counter</button>
 *         <button onClick={reset}>Reset counter</button>
 *         <button onClick={decrement}>Decrement counter</button>
 *         <p>{count}</p>
 *       </>
 *      )
 *    }
 */

export const useXiApp = (axiosInstance?: AxiosInstance) => create<IUseXi>()(set => {
  let instance = axios.create();
  if (axiosInstance)
    instance = axiosInstance;

  const inject = (...props: (new (self: UseXiSelf, axiosInstance: AxiosInstance) => XiService)[]) =>
    props.map(service => new service(self, instance))

  const self: UseXiSelf = {
    setIsLoading: (loading) => set(_ => ({ isLoading: loading })),
    setSuccess: (success) => set(_ => ({ success })),
    setError: (error) => set(_ => ({ error })),
    setData: (data) => set(_ => ({ data }))
  }

  const wrap = async (func: (axiosInstance: AxiosInstance) => Promise<any>) => {
    self.setSuccess(false);
    try {
      self.setIsLoading(true);
      self.setError(null);
      self.setData(null);

      const res = await func(axiosInstance as AxiosInstance);

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

  return {
    error: null,
    data: null,
    axios: instance,
    isLoading: false,
    success: false,
    self,
    wrap,
    inject
  }
})()
