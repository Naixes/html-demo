import {defineComponent, h, onMounted, onUnmounted, Prop, PropType, ref, Ref, toRefs, watch} from 'vue'
import Highcharts, {Chart, Options} from 'highcharts'

const vueHighCharts = defineComponent({
    name: 'VueHighCharts',
    props: {
        type: {
            type: String as PropType<keyof typeof Highcharts>,
            default: 'chart'
        },
        options: {
            type: Object as PropType<Options>,
            required: true
        },
        redrawOnUpdate: {
            type: Boolean,
            default: true
        },
        oneToOneUpdate: {
            type: Boolean,
            default: true
        },
        animateOnUpdate: {
            type: Boolean,
            default: true
        }
    },
    setup(props, {emit}){
        const chartRef = ref(null)
        const chart: Ref<Chart | null> = ref(null)
        const {options} = toRefs(props)
        if(options.value) {
            watch(options, (newVal) => {
                if(chart.value !== null) {
                    ((chart as unknown) as Ref<Chart>).value.update(
                        newVal, 
                        props.redrawOnUpdate, 
                        props.oneToOneUpdate, 
                        props.animateOnUpdate
                    )
                    emit('update')
                }
            }, {
                deep: true
            })
            onMounted(() => {
                chart.value = Highcharts[props.type](
                    chartRef.value,
                    options.value,
                    () => {
                        emit('rendered')
                    }
                )
            })
            onUnmounted(() => {
                if(chart?.value) {
                    (<Ref<Chart>>(chart as unknown)).value.destroy()
                }
                emit('destroyed')
            })
        }else {
            console.error('请传递正确的参数');
        }
        // 给外界暴露
        return {
            chartRef,
            chart
        }
    },
    render() {
        return h("div", {
            class: 'vue-highcharts',
            ref: 'chartRef'
        })
    }
})

export default vueHighCharts