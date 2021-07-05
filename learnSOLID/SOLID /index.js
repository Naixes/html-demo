function Yideng(name) {
    this.name = name;
}
//let ydSet = new Set();
let student1 = new Yideng();
let student2 = new Yideng();
setTimeout(function () {
    student1 = null;
})
// ydSet.add(student1)
setTimeout(function () {
    student1 = null;
})


//大屏幕这个项目开发完毕