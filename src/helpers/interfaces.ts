import { ROMService } from "./ROMService";
import { AxiosInstance } from 'axios';


export interface UseROMSelf {
    setIsLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
    setSuccess: (success: boolean) => void;
    setData: (data: any) => void;
}

export interface IUseROM {
    isLoading: boolean;
    success: boolean;
    axios: AxiosInstance;
    error: Error | null;
    data: any;
    self: UseROMSelf;
    inject: (...props: (new (self: UseROMSelf, axiosInstance: AxiosInstance) => ROMService)[]) => any[];
};