<template>
    <div>
        <!-- vue动画 -->
        <h1>过渡类名实现动画</h1>
        <input
            type="button"
            value="显示隐藏"
            @click="show1=!show1"
        >
        <!-- 使用 transition 将需要过渡的元素包裹起来，name是类名的前缀，没有时是v- -->
        <transition name="fade">
            <div v-show="show1" class="box1">动画</div>
        </transition>
        <hr>
        <!-- vue动画 -->
        <h1>钩子函数实现半场动画</h1>
        <input
            type="button"
            value="显示隐藏"
            @click="show2=!show2"
        >
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div v-show="show2" class="box2">动画</div>
        </transition>
        <hr>
        <!-- vue动画 -->
        <h1>列表渲染动画</h1>
        <input
            type="text"
            v-model="txt"
            @keyup.enter="add"
        >
        <!-- 列表渲染 -->
        <!-- appear表示初始渲染的动画 -->
        <!-- transition-group还可以改变定位 -->
        <transition-group tag="ul" name="list" appear>
            <li v-for="(e, i) in list" :key="e" style="width: 100px;">
                {{e}}
                <a href="#" @click="del(i)">删除</a>
            </li>
        </transition-group>
    </div>
</template>
<script>
export default {
  data () {
    return {
      show1: true,
      show2: false,
      list: [1, 2, 3, 4],
      txt: ''
    }
  },
  methods: {
    add () {
      this.list.push(this.txt)
    },
    del (i) {
      this.list.splice(i, 1)
    },
    // 2，钩子函数实现半场动画
    beforeEnter (el) {
      el.style.transform = 'translateX(100px)'
    },
    enter (el, done) {
      // eslint-disable-next-line
      el.offsetWidth
      el.style.transform = 'translateX(0)'
      done()
    },
    afterEnter (el) {
      this.show2 = !this.show2
    }
  }
}
</script>

<style lang="css" scoped>
.box1,
.box2 {
    margin-top: 20px;
    width: 60px;
    height: 60px;
    background-color: #ccc;
}
.box2 {
    transition: all .5s ease;
}
/* 1，过渡类名实现动画 */
/* 定义进入和离开时候的过渡状态 */
.fade-enter-active,
.fade-leave-active {
    transition: all 3s;
}

/* 定义进入过渡的开始状态 和 离开过渡的结束状态 */
.fade-enter,
.fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
    transition: all .5s ease;
}
.list-leave-active {
    /* -leave-active可以改变定位与-move结合使用 */
    /* 可以让过渡更加平滑 */
    position: absolute;
}
.list-move {
    transition: all .5s ease;
}
.list-enter,
.list-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
