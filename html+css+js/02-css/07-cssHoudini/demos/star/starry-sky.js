class StarrySky {
  constructor() {
    // 初始化
    this.lastPaintSize = this.paintSize = {
      width: 0,
      height: 0,
    };
    this.stars = [];
  }
  static get inputProperties() {
    return ['--starry-sky-seed', '--star-opacity', '--star-density'];
  }
  paint(ctx, paintSize, poperties) {
    let xMax = paintSize.width;
    let yMax = paintSize.height; // 黑色夜空
    ctx.fillRect(0, 0, xMax, yMax); // 星星的数量
    // let hmTimes = xMax + yMax;
    // 获取自定义属性值
    let starDensity = poperties.get('--star-density').toString() || 1; // 最大只能为1
    starDensity > 1 && (starDensity = 1); // 星星的数量剩以这个系数
    // 每个星星的透明度都乘以这个系数
    let hmTimes = Math.round((xMax + yMax) * starDensity);
    for (let i = 0; i <= hmTimes; i++) {
      // 星星的xy坐标，随机
      let x = Math.floor(Math.random() * xMax + 1);
      let y = Math.floor(Math.random() * yMax + 1); // 星星的大小
      let size = Math.floor(Math.random() * 2 + 1); // 星星的亮暗
      let opacityOne = Math.floor(Math.random() * 9 + 1);
      let opacityTwo = Math.floor(Math.random() * 9 + 1);
      let opacity = +('.' + (opacityOne + opacityTwo)) * starDensity;
      let hue = Math.floor(Math.random() * 360 + 1);
      // ctx.fillStyle = `hsla(${hue}, 30%, 80%, .${opacityOne +
      // 	opacityTwo})`;
      ctx.fillStyle = `hsla(${hue}, 30%, 80%, ${opacity})`;
      ctx.fillRect(x, y, size, size);
    }
  }
}
registerPaint('starry-sky', StarrySky);
