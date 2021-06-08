import React, { FC } from 'react';
import './App.css';
import { atom, useRecoilState, useRecoilValue, selector } from './recoil';

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

  const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
      const text = get(textState);
      return text.length;
    },
  });

  const count = useRecoilValue(charCountState);

  return (
    <div className="App">
      <h1>{msg}</h1>
      <button onClick={click}>xx</button>
      <h2>{count}</h2>
    </div>
  );
};

export default App;
