class Front {
    private naixes: string
    constructor() {
        this.naixes = 'ok'
    }
}

const front = new Front();
// ts中的private等权限控制并无实际作用，查看编译后
(front as any).naixes

// 以下写法可以
// class Front2 {
//     #naixes: string
//     constructor() {
//         this.#naixes = 'ok'
//     }
// }

// const front2 = new Front2();
// (front2 as any).naixes