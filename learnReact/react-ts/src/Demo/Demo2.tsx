// VFC不带children的FC
import React, { FC, VFC } from 'react';
type AppProps = {
  message: string;
};
//最简单的
const App = ({ message }: AppProps) => <div>{message}</div>;
const App2 = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

const App3 = ({ message }: { message: string }): JSX.Element => (
  <div>{message}</div>
);
console.log(App3);
const App4: FC<AppProps> = ({ message }) => <div>{message}</div>;
//不带children
//const App5:VFC<AppProps> = ({children,message}) => <div title={message}>children</div>
