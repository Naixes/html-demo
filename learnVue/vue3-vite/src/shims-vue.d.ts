// client.d.ts中已定义，tsconfig中配置的
// declare module "*.css" {
//     const classes: {[key: string]: string}
//     export default classes
// }

declare module "*.vue" {
    // import {defineComponent, FunctionalComponent} from 'vue'
    import {DefineComponent} from 'vue'
    // const component: ReturnType<typeof defineComponent> | FunctionalComponent
    // 参考官方模版
    const component: DefineComponent<{}, {}, any>
    export default component
}