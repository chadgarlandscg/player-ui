import { AxiosInstance } from "axios";

export default class HttpUtil {
    private readonly axios: AxiosInstance
    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }
    get<Response>(url): Promise<Response> {
        return this.axios.get(url).then((result) => {
            return result.data;
        }).catch((error) => {
            throw new Error(error.response)
        });
    }
    post<Body, Response>(url: string, body: Body): Promise<Response> {
        return this.axios.post(url, body).then((result) => {
            return result.data;
        }).catch((error) => {
            throw new Error(error.response)
        });
    }
    put<Body>(url: string, body: Body) {
        return this.axios.put(url, body).then((result) => {
            return result.data;
        }).catch((error) => {
            throw new Error(error.response)
        });
    }
    delete<Response>(url: string): Promise<Response> {
        return this.axios.delete(url).then((result) => {
            return result.data;
        }).catch((error) => {
            throw new Error(error.response)
        });
    }
}