import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'sub-vue',
    entry: '//localhost:7777',
    // entry: { scripts: ['//localhost:8081/js/app.js'] },
    container: '#app1',
    activeRule: '/',
  },
  {
    name: 'sub-react', // app name registered
    entry: '//localhost:7788',
    container: '#app2',
    activeRule: '/',
  },
]);
start();
