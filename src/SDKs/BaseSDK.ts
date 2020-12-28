import HttpUtil from "./HttpUtil";
import { axiosInstance } from './AxiosInstance'

export abstract class BaseSDK {
    protected httpUtil: HttpUtil;
    constructor() {
        this.httpUtil = new HttpUtil(axiosInstance);
    }
}