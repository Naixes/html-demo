<template lang="html">
  <div class="ydc-tabPanel">
    <div>
      <ul>
        <li v-for="data,index in datas" :class="index==cur?'hit':''" @click="cur=index">{{data.title}}</li>
      </ul>
    </div>
    <div class="ydc-panes">
      <div class="ydc-pane" v-for="(data, index) in datas" :style="{display: index==cur?'block':'none'}">
        <ol class="ydc-pane-list">
          <li v-for="news in data.data">
            <a :href="news.href" target="_blank">{{news.title}} <i v-if="news.isNew">new</i></a>
            <span>{{news.time}}</span>
          </li>
        </ol>
        <Pagination/>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  name: 'tabPanel',
  data(){
    return {
      cur: 0,
      datas: [
        {title: '公告栏', data: [
          {id: 2, title: '一点车关于封禁通知（4月13日-4月20日）', isNew: true, href: 'http://www.bing.com', time: 1544537222},
          {id: 4, title: '一点车关于封禁通知（4月13日-4月21日）', isNew: false, href: 'http://www.bing.com', time: 1544537002},
          {id: 8, title: '一点车关于封禁通知（4月13日-4月23日）', isNew: false, href: 'http://www.bing.com', time: 1543537222},
          {id: 15, title: '一点车关于封禁通知（4月13日-4月20日）', isNew: false, href: 'http://www.bing.com', time: 1544536222},
        ]},
        {title: '一点车资讯', data: [
          {id: 2, title: 'asdfadfgfghfgh', isNew: true, href: 'http://www.bing.com', time: 1544537222},
          {id: 4, title: 'ewyrthdfh-4月20日）', isNew: true, href: 'http://www.bing.com', time: 1544537222},
          {id: 8, title: 'rthdfhdf-4月20日）', isNew: false, href: 'http://www.bing.com', time: 1544537222},
          {id: 15, title: 'fghdfghdf-4月20日）', isNew: false, href: 'http://www.bing.com', time: 1544537222},
        ]}
      ]
    }
  },
  components: {Pagination}
}
</script>

<style lang="css" scoped>
</style>
