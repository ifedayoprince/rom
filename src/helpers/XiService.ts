import { XiProps } from "./interfaces";

/**
 * The parent class of all services that interact with Xaxi.
 * @class XiService
 * @example 
 *  import { XiService } from "./helpers/XiService";
    import { XiInjectable, XiUnwrap } from "./helpers/decorators";
    import { XiProps } from "./helpers/interfaces";

    XiInjectable()
    export class TestService implements XiService {
        async getErroneousData() {
            return await this.props.axios.get("error");
        }

        async getData() {
            const res = await this.props.axios.get('http://localhost:3002/test');
            return res.data;
        }

        XiUnwrap()
        async getDataDecorator() {
            const res = await this.props.axios.get('http://localhost:3002/test');
            return res.data;
        }

        public props: XiProps;
        constructor(props: XiProps) { this.props = props }
    }
 */
export class XiService {
    public props!: XiProps;
}
