interface ProductIncart {
    id: string,
    name: string,
    label?: string
}

// Record<K, V>，将V作为整体当成value，key类型为K，生成新的类型，对象嵌套对象
class CarModel {
    products: Record<string, ProductIncart> = {
        "sin": {
            id: "string",
            name: "string",
            label: "string"
        }
    }
}
// 相当于
interface Same {
    [key: string]: ProductIncart
}

// ==================解决旧版本的代码提示失效===================
// 相当于type t = string & {}
type LiteralUnion<T extends UIEvent,U=string> = T | (U & {})