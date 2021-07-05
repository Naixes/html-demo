import { GET, route } from "awilix-koa";
import { IApi } from "../interfaces/IApi";
import { Context } from "../interfaces/IKoa";

@route('/api')
class ApiController {
    private apiService: IApi
    // AOP(面向切面编程)
    // :解构，:类型
    constructor({apiService}: {apiService: IApi}) {
        // 注入
        this.apiService = apiService
    }
    @route('/list')
    @GET()
    async actionList(ctx: Context): Promise<void> {
        const data = await this.apiService.getInfo()
        ctx.body = {
            data
        }
    }
}

export default ApiController