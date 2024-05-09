import { XiService } from "./XiService";
import { AxiosInstance } from 'axios';

/**
 * The core module with which services interact with Xaxi.
 */
export interface UseXiSelf {
    /**
     * Sets the loading state of the hook.
     * @param loading the loading state.
     * @returns 
     */
    setIsLoading: (loading: boolean) => void;

    /**
     * Sets the error message on the hook.
     * @param error the error message returned by the action.
     * @returns 
     */
    setError: (error: Error | null) => void;

    /**
     * Sets the success state of the hook.
     * @param success the success state of the action.
     * @returns 
     */
    setSuccess: (success: boolean) => void;

    /**
     * Sets the data response on the hook.
     * @param data the data returned from the action.
     * @returns 
     */
    setData: (data: any) => void;
}


/**
 * This interface exposes the types necessary for a smooth DX when used with TypeScript.
 * @interface IUseXi
 */
export interface IUseXi {

    /**
     * Indicates when an injected service is loading.
     * @readonly 
     */
    isLoading: boolean;

    /**
     * Indicates if the action by an injected service was a success.
     * @readonly
     */
    success: boolean;

    /**
     * The current initialized `AxiosInstance`
     * @readonly
     */
    axios: AxiosInstance;

    /**
     * The error message returned from an action performed by the injected service.
     * @type `Error`
     * @readonly
     */
    error: Error | null;

    /**
     * The response returned from an action performed by the injected service.
     * @readonly 
     */
    data: any;

    /**
     * The global object used by services to interact with the hook.
     * @readonly
     * @private Do not call it's methods except in a service.
     */
    self: UseXiSelf;

    /**
     * Takes a list of services returns an array of the services initialized with the current hook.
     * @param props A services that extend the `XiService` class.
     * @readonly 
     * @returns an array of initialized services.
     * 
     * @example 
     * const { inject } = useXiPage();

       const [testService] = inject(TestService) as 
             [TestService];
     * 
     */
    inject: (...props: (new (self: UseXiSelf, axiosInstance: AxiosInstance) => XiService)[]) => any[];


    /**
     * A convenient wrapper for performing slight actions that don't necessarily need a new service. 
     * Interacts with the service and automatically sets the `isLoading`, `success` and `error` states.
     * 
     * @param func the function containing the code to be executed.
     * @returns the response of the action.
     * @example 
     * const { wrap } = useXiPage();

       wrap((axiosInstance)=>{
           return await this.axiosInstance.get('https://jsonplaceholder.typicode.com/posts');
       })
     */
    wrap: (func: (axiosInstance: AxiosInstance) => any) => any;
};


export interface XiProps {
  self: UseXiSelf,
  axios: AxiosInstance
}