import React from 'react';
const { lazy, Suspense } = React;
// 引入app2的组件
const Button = lazy(() => import('app2/Button'));
const App = () => (
  <div>
    <h3>基础的Remote微前端应用</h3>
    <h2>基座应用</h2>
    <hr />
    <Suspense fallback="loading...">
      <Button />
    </Suspense>
  </div>
);

export default App;
