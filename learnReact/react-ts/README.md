`npx create-react-app my-app --template typescript`

类型

```tsx
import  React,{MouseEvent,ReactChildren,ReactChild,ReactNode} from "react"
// 代码是代码 类型是类型
export  declare  interface AppProps{
    onClick(event:MouseEvent<HTMLButtonElement>):void;
    //不好 单一的元素 不考虑数组
    children1:JSX.Element;
    //不接收字符串
    children2:JSX.Element | JSX.Element[];
    //ReactChildren他不是类型 使用程序
    children3:ReactChildren;
    //接受子数组
    children4:ReactChild[];
    children:ReactNode;
    functionChildren:(name:string)=>ReactNode;
    //css in js
    style?:React.CSSProperties;
    //react 表单事件
    onChange:React.FormEventHandler<HTMLInputElement>;
    //传递props 明确不转发类型ref diy ref
    props:React.ComponentPropsWithoutRef<"button">
}
//实例演示
// type Props = {
//     children: React.ReactNode;
// }
// function  Com({children}:Props){
//     return <div>{children}</div>
// }
// function App() {
//     return <Com>{{}}</Com>
// }
// const App = ():ReactNode=>{
//     return 111
// }
// console.log(App)

// React.createElement创建的元素 JSX.Element
```

