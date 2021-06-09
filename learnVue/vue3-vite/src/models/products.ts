import { useApi } from "@/hooks"
import { Ref, ref } from "vue"

export interface Product {
    id: string
}

export type UseableProducts = {products: Ref<Product[] | undefined>}

export default async function useProducts(): Promise<UseableProducts> {
    const {response: products, request} = useApi<Product[]>('url')
    const loaded = ref(false)
    if(loaded.value === false) {
        await request()
        loaded.value = true
    }
    return {products}
}