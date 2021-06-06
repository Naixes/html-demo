//1.keyof keyof 与 Object.keys 略有相似，只不过 keyof 取 interface 的键。
// const data = {
//     a: 3,
//     hello: "world",
//   };
//   // 1.无法确认返回类型：这将损失 ts 最大的类型校验功能
//   // 2.无法对 key 做约束：可能会犯拼写错误的问题
//   // function get(o: object, name: string) {
//   //   return o[name];
//   // }
//   function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
//     return o[name];
//   }
//   const data1 = get(data, "hello");
//   console.log(data1);

//----------------------------------------------------------------
//2.Condition Type
// type isTrue<T> = T extends true ? true : false
// // 相当于 type t = false
// type t = isTrue<number>

// // 相当于 type t = false
// type t1 = isTrue<false>

//----------------------------------------------------------------
// 3.typeof 代表取某个值的 type，可以从以下示例来展示他们的用法
// const a: number = 3

// // 相当于: const b: number = 4
// const b: typeof a = 4
// //在一个典型的服务端项目中，我们经常需要把一些工具塞到 context 中，如config，logger，db models, utils 等，此时就使用到 typeof。
// import logger from './logger'
// import utils from './utils'

// interface Context extends KoaContect {
//   logger: typeof logger,
//   utils: typeof utils
// }

// app.use((ctx: Context) => {
//   ctx.logger.info('hello, world')

//   // 会报错，因为 logger.ts 中没有暴露此方法，可以最大限度的避免拼写错误
//   ctx.loger.info('hello, world')
// });

//----------------------------------------------------------------
// 4.is
// if ((err as AxiosError).isAxiosError) {
//     code = `Axios-${(err as AxiosError).code}`
//   }
// function isAxiosError(error: any): error is AxiosError {
//   return error.isAxiosError;
// }

// if (isAxiosError(err)) {
//   code = `Axios-${err.code}`;
// }
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
