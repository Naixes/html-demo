import { useRef, useEffect } from "react";

const App = () => {
  const divRef = useRef<HTMLDivElement>(null!);
  //可变的ref
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // if (!divRef.current) {
    //   throw new Error("对象不可用");
    // }
    //highcharts引用
    // intervalRef.current = setInterval(function () {}, 300);
    // return () => clearInterval(intervalRef.current);
    console.log(divRef.current);
  });
  return <div ref={divRef}>etc</div>;
};
console.log(App);
