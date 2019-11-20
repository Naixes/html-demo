let a = 0;
let yideng = async () => {
	a = a + await 10;
	console.log(a) // 10
}
yideng();
console.log(++a); // 1

// babel会编译成 while(true) {throw error} 这种形式