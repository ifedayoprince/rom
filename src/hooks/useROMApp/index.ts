import { IUseROM, UseROMSelf } from '../../helpers/interfaces';
import axios, { AxiosInstance } from 'axios';
import { ROMService } from '../../helpers/ROMService';
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

export const useROMApp = (axiosInstance?: AxiosInstance) => create<IUseROM>()(set => {
  let instance = axios.create();
  if (axiosInstance)
    instance = axiosInstance;

  const inject = (...props: (new (self: UseROMSelf, axiosInstance: AxiosInstance) => ROMService)[]) =>
    props.map(service => new service(self, instance))

  const self: UseROMSelf = {
    setIsLoading: (loading) => set(_ => ({ isLoading: loading })),
    setSuccess: (success) => set(_ => ({ success })),
    setError: (error) => set(_ => ({ error })),
    setData: (data) => set(_ => ({ data }))
  }

  
  return {
    error: null,
    data: null,
    axios: instance,
    isLoading: false,
    success: false,
    self,
    inject
  }
})()
