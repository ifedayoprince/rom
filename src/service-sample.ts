import { AxiosInstance } from "axios";
import { ROMService } from "./helpers/ROMService";
import { UseROMSelf } from "./helpers/interfaces";

export class TestService extends ROMService {
  private axiosInstance: AxiosInstance;

  constructor(self: UseROMSelf, axiosInstance: AxiosInstance) {
    super(self);
    this.axiosInstance = axiosInstance;
  }

  async getErroneousData() {
    await super.wrap(async () => {
      return await this.axiosInstance.get("error");
    })
  }
  async getData() {
    return await super.wrap(async () => {
      const res = await this.axiosInstance.get('https://jsonplaceholder.typicode.com/posts');
      return res.data;
    })
  }

}