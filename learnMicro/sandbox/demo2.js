//只有同域的 iframe 才能取出对应的的 contentWindow.
//所以需要提供一个宿主应用空的同域URL来作为这个 iframe 初始加载的 URL.
//根据 HTML 的规范 这个 URL 用了 about:blank 一定保证保证同域，也不会发生资源加载。
const iframe = document.createElement('iframe', { url: 'about:blank' });

const sandboxGlobal = iframe.contentWindow;
foo(sandboxGlobal);
// 此时的document为iframe内部对象
