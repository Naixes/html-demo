import React from 'react';

//设置最简单的默认props
// type GreetProps = { age?: number };
// const App = ({ age = 21 }: GreetProps) => {};
//type GreetProps = { age: number } & typeof defaultProps;
//设置他的默认值
// const defaultProps = {
//   msg: 21,
// };
// const App = ({ msg }: GreetProps) => {
//   console.log(msg);
// };
interface IProps {
  name: string;
}
const defaultProps = {
  age: 25,
};
const GreetComponent = ({ name, age }: IProps & typeof defaultProps) => (
  <div>{`Hello, my name is ${name}, ${age}`}</div>
);
//组件默认值
GreetComponent.defaultProps = defaultProps;
//怎么去拿别的组件的props

//公司私有组件库 button +  input -> 新组件
// const TestComponent = (props: React.ComponentProps<typeof GreetComponent>) => {
//   return <span>{props.age}</span>;
// };
//问题很大？？？props属性必须都传

type ComponentProps<T> = T extends
  | React.Component<infer P>
  | React.ComponentType<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
  return <span>{props.age}</span>;
};
const el = <TestComponent name="apple" />;
console.log(el);
