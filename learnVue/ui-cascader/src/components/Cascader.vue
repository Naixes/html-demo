<template>
    <div class="cascader" v-click-outside="hideOptions">
        <div class="select" @click="toggleOptions">
            {{result}}
        </div>
        <div class="wrapper" v-if="fShowOptions">
            <!-- <CascaderItem></CascaderItem> -->
            <div class="cascader-left">
                <ul>
                    <li v-for="(option, index) in options" :key="index" @click="select(option)">{{option.value}}</li>
                </ul>
            </div>
            <div class="cascader-right">
                <ul>
                    <li v-for="(option, index) in selectedOptions" :key="index" @click="select(option)">{{option.value}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// 指令：判断是否点击了dom元素以外的部分
import {clickOutside} from '../directions/clickOutside'

export default {
    components: {
        CascaderItem: () => import('./CascaderItem')
    },
    directives: {
        clickOutside
    },
    props: {
        options: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            // f开头表示flag
            fShowOptions: false,
            // 当前选中的完整内容
            result: '',
            selectedOptions: ''
        }
    },
    methods: {
        select(opt) {
            this.selectedOptions = opt.children
        },
        toggleOptions() {
            this.fShowOptions = !this.fShowOptions
        },
        hideOptions() {
            this.fShowOptions = false
        }
    }
}
</script>

<style lang="stylus">
ul 
    margin 0;
    padding 0;
    list-style none;
li
    padding 4px 6px;
.cascader 
    display inline-block;
    .wrapper
        display flex;
        ul
            border 1px solid #ccc;
            margin-top -1px;
        li
            min-width 50px;
            cursor pointer;
            &:hover 
                background-color #eee;
        // li+li
        //     border-top 1px solid #ccc;
    .select 
        width 150px;
        height 30px;
        border 1px solid #aaa;
        cursor pointer;
</style>