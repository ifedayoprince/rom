import { XiService } from "./helpers/XiService";
import { XiInjectable } from "./helpers/decorators";
import { XiProps } from "./helpers/interfaces";

@XiInjectable()
export class TestService implements XiService {
    async getData() {
        const res = await this.props.axios.get('http://localhost:3002/test');
        return res.data;
    }

    public props: XiProps;
    constructor(props: XiProps) { this.props = props }
}