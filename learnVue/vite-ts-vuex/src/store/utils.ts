import {modules} from './modules'
// 从
// {
//     user: {
//         getters: {
//             isLogin: (...) => string
//         }
//     }
// }

// 目标：{
//     "user/isLogin": string,
//     "wechat/isTest": string
// }

// 1. 先取出所有的getters，{user{isLogin: {...}}, ...}
// infer：表示待推断的类型变量
// Module: getters: {...}
// G: isLogin{...}
type GetGetter<Module> = Module extends {getters: infer G} ? G : unknown 
type GetGetters<Modules> = {
    // K: user, Modules[K]: getters: {...}
    [K in keyof Modules]: GetGetter<Modules[K]>
}
type ModuleGetters = GetGetters<typeof modules>

// 2. 拼接，{user: 'user/isLogin'}
// 3. 获取value，'user/isLogin'
// user/Login
type AddPrefix<Prefix, Key> = `${Prefix & string}/${Key & string}`
type GetSpliceKeys<Modules> = {
    [K in keyof Modules]: AddPrefix<K, keyof Modules[K]>
}[keyof Modules]

// 4. 合并，{'user/isLogin': fn, ...}
// T, ModuleGetters
type GetFun<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]]

// {'user/isLogin': fn, ...}
type GetSpliceObj<T> = {
    [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFun<T, A, B> : unknown
}

type SpliceObj = GetSpliceObj<ModuleGetters>

// 5. 提取返回值类型
type Getters = {
    [K in keyof SpliceObj]: ReturnType<SpliceObj[K]>
}

export {Getters}