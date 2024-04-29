import { UseROMSelf } from "./interfaces";

export class ROMService {
    private self: UseROMSelf;

    constructor(self: UseROMSelf) {
        this.self = self
        console.log("intialized");
    }
    async wrap(func: () => Promise<any>) {
        this.self.setSuccess(false);
        try {
            this.self.setIsLoading(true);
            this.self.setError(null);
            this.self.setData(null);

            const res = await func();

            this.self.setSuccess(true)
            this.self.setIsLoading(false);
            this.self.setData(res);
            return res
        } catch (e: any) {
            this.self.setIsLoading(false);
            this.self.setError(e);
            this.self.setData(null);
        }
    }
}
