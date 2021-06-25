import {
  registerMicroApps,
  start,
  setDefaultMountApp,
  runAfterFirstMounted,
  initGlobalState,
} from 'qiankun';
registerMicroApps([
  {
    name: 'sub-vue',
    entry: '//localhost:7777',
    // entry: { scripts: ['//localhost:8081/js/app.js'] },
    container: '#app1',
    activeRule: '/sub-vue',
  },
  {
    name: 'sub-react', // app name registered
    entry: '//localhost:7788',
    container: '#app2',
    activeRule: '/sub-react',
  },
]);
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: '京程一灯🏮',
});
console.log('🏮[onGlobalStateChange - master]:');
onGlobalStateChange((value, prev) =>
  console.log('🏮[onGlobalStateChange - master]:', value, prev)
);

// setDefaultMountApp('sub-vue');
// start();

setTimeout(function () {
  setGlobalState({
    ignore: 'master',
    user: {
      name: 'master',
    },
  });
}, 1000);

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
