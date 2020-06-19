import { ResponseError } from 'umi-request';

export const request = {
    // 配置所有请求的 prefix
    prefix: '/api',
    errorHandler: (error: ResponseError) => {
        // 集中处理错误
        console.log(error);
    },
};
