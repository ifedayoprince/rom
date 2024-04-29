import { useState } from 'react';
import { IUseROM, UseROMSelf } from '../../helpers/interfaces';
import axios, { AxiosInstance } from 'axios';
import { ROMService } from '../../helpers/ROMService';


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

export const useROMPage = (axiosInstance?: AxiosInstance): IUseROM => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const self: UseROMSelf = {
    setIsLoading,
    setSuccess,
    setData,
    setError
  }

  if (!axiosInstance)
    axiosInstance = axios.create();

  const inject = (...props: (new (self: UseROMSelf, axiosInstance: AxiosInstance) => ROMService)[]) => 
      props.map(service => new service(self, axiosInstance));

  return {
    isLoading,
    axios: axiosInstance,
    success,
    inject,
    data,
    error,
    self
  };
};
