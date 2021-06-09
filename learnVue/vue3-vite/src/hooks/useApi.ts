import { Ref, ref } from "vue"

export type ApiRequest = () => Promise<void>

// 要有输入有输出
export interface UseableApi<T> {
    response: Ref<T | undefined>,
    request: ApiRequest
}

export default function useApi<T>(url: RequestInfo, options?: RequestInit) {
    const response: Ref<T | undefined> = ref()
    const request = async() => {
        const res = await fetch(url, options)
        const data = await res.json()
        response.value = data
    }
    return {
        response,
        request
    }
}

export { useApi }