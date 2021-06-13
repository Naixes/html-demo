import { ReactNode, useEffect } from "react";

const App = (props: { timerMs: number }): ReactNode => {
  const { timerMs } = props;

  useEffect(() => {
    //js本身返回值
    setTimeout(() => {
      console.log(1111);
    }, timerMs);
  }, [timerMs]);

  return null;
};
export default App;
