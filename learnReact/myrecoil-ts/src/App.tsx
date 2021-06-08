import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { atom, useRecoilValue } from './recoil';

const textState = atom({
  key: 'textState',
  default: '',
});

const App: FC = () => {
  const msg = useRecoilValue(textState);
  return (
    <div className="App">
      <h1>{msg}</h1>
    </div>
  );
};

export default App;
