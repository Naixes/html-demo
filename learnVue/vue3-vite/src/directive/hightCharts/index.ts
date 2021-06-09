import {App, Plugin} from 'vue'

import vueHighCharts from './vueHighCharts'

const install = (app:App) => {
    app.component(vueHighCharts.name, vueHighCharts)
}
vueHighCharts.install = install

// 强制转换类型
export default (vueHighCharts as unknown) as Plugin