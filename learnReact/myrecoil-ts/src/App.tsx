import React, { FC } from 'react';
import './App.css';
import { atom, useRecoilState, useRecoilValue } from './recoil';

const textState = atom({
  key: 'textState',
  default: 'test',
});

const App: FC = () => {
  // const msg = useRecoilValue(textState);
  const [msg, setMsg] = useRecoilState(textState);
  // input change 事件的 e 最好使用 react 的类型，ChangeEvent<HTMLInputElement>
  const click = () => {
    setMsg('update');
  };
  return (
    <div className="App">
      <h1>{msg}</h1>
      <button onClick={click}>xx</button>
    </div>
  );
};

export default App;
