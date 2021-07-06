declare module 'koa-swig' {
  function render<T>(value: T | renderer.DefaultSettings): any;
  // namespace防止重复命名
  namespace renderer {
    interface DefaultSettings {
      root: string;
      autoescape: boolean;
      cache: boolean | string;
      writeBody: boolean;
      ext: string;
    }
  }

  export default render;
}
