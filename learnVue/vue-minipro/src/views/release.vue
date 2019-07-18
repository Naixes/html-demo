<template lang="html">
  <div class="ydc-release-content">
    <TabPanelRelease :tabs="tabs">
      <template slot="amount">
        <div class="ydc-release-amount">
          <span>
            今日发布数量：<em>0</em>
            /6 <a href="standard.html" target="_blank">发文规范</a>
          </span>
        </div>
      </template>
      <template slot="tab1">
        <div class="ydc-form-city">
            <form :action="SERVER+'api/publish'" method="post" enctype="multipart/form-data" ref="form">
              <!-- token -->
              <input type="text" hidden name="token" :value="token">
              <div class="ydc-release-form-group ">
                  <div class="ydc-warning-default">
                      <p>标题字数需在11字到30字之间。</p>
                  </div>
                  <div class="ydc-release-form-group-input">
                      <input type="text" class="ydc-form-control" title="" placeholder="请输入标题，为了更好的展示效果，建议标题字数在30个汉字以内" name="title" >
                      <div class="ydc-form-group-jl">
                          <span id="messageCount">0</span>/30
                      </div>
                  </div>
              </div>
              <div class="ydc-release-form-text">
                  <textarea name="content" class="ydc-form-control" placeholder="请输入内容"></textarea>
              </div>
              <div class="aui-card-form-item">
                  <label class="aui-card-form-label">分类:</label>
                  <!-- 多级分类 -->
                  <div class="aui-card-form-input">
                    <select name="catalogs" v-for="(catalog, index) in catalogs" :key="index" @change="changCat(index)" ref="catalog">
                      <option value="">请选择</option>
                      <option v-for="item in catalog" :key="item.ID" :value="item.ID">{{item.title}}</option>
                    </select>
                  </div>
              </div>
              <div class="aui-card-form-item preview  aui-news">
                <label class="aui-card-form-label">封面:</label>
                <div class="aui-file-up-img" id="preview_0">
                  <img class="" id="imghead_0" border="0" src="../assets/images/icon/noimg.gif">
                </div>
                <div class="aui-file-up-btn clearfix ">
                  <div class="idPicFile aui-btn aui-file-new">
                    <input type="file" name="cover" id="1" class="file_photo aui-file-new-up" style="margin:0;">
                    <a>上传图片</a>
                  </div>
                  <div class="aui-remarks">
                    <p>图片尺寸建议：800*400 图片大小不超过1MB</p>
                  </div>
                </div>
              </div>
              <div class="ydc-btn">
                <!-- 不指定type默认为submit会跳转 -->
                <button type="button" class="btn" @click="publish">发布</button>
                <button type="button" class="btn btn-default">保存草稿</button>
              </div>
            </form>
        </div>
      </template>

      <template slot="tab2">
        <div class="ydc-release-form-group ">
          <div class="ydc-warning-default">
            <p>标题字数需在11字到30字之间。</p>
          </div>
          <div class="ydc-release-form-group-input clearfix">
            <label class="aui-card-form-label">标题:</label>
            <input style="width:89.999%" type="text" name="title" class="ydc-form-control" title="" placeholder="请输入标题，为了更好的展示效果，建议标题字数在30个汉字以内" onkeyUp="textLimitCheck(this, 30);">
            <div class="ydc-form-group-jl">
              <span id="messageCount1">0</span>/30
            </div>
          </div>
          <div class="ydc-release-form-group-input ydc-release-form-group-ms clearfix">
            <label class="aui-card-form-label">描述:</label>
            <input style="width:89.999%" type="text" name="" class="ydc-form-control" title="" placeholder="请输入描述，统一描述" onkeyUp="">
            <div class="ydc-form-group-jl">
              <span id="">0</span>/30
            </div>
          </div>
          <div class="aui-card-form-item preview  aui-news" style="margin-top:20px;">
            <label class="aui-card-form-label">封面:</label>
            <div class="aui-file-up-img" id="preview_0">
              <img class="" id="imghead_0" border="0" src="../assets/images/icon/noimg.gif">
            </div>
            <div class="aui-file-up-btn clearfix ">
              <div class="idPicFile aui-btn aui-file-new">
                <input type="file" name="file" id="1" class="file_photo aui-file-new-up" style="margin:0;">
                <a>上传图片</a>
              </div>
              <div class="aui-remarks">
                  <p>图片尺寸建议：800*400 图片大小不超过1MB</p>
              </div>
            </div>
          </div>
          <div class="ydc-btn" style="margin-top:20px;">
            <button class="btn" @click="publish">发布</button>
            <button class="btn btn-default">保存草稿</button>
          </div>
        </div>
      </template>
    </TabPanelRelease>
  </div>
</template>

<script>
import TabPanelRelease from '@/components/TabPanelRelease';
import {SERVER} from '../config'
import ajax from '../lib/ajax'

export default {
  data(){
    return {
      tabs: [
        {title: '发布文章', slotname: 'tab1'},
        {title: '发布图集', slotname: 'tab2'},
        {title: '测试', slotname: 'tab5655'},
      ],
      catalogs: [],
      SERVER,
      token: localStorage.getItem('token')
    }
  },
  components: {TabPanelRelease},
  async created(){
    let res = await fetch(SERVER+'api/artical_type/0')
    let arr = await res.json()
    this.catalogs = [arr]
  },
  methods: {
    async publish() {
      let form = this.$refs['form']
      let res = await ajax(form)
      if(res.err) {
        alert(res.msg)
      }else {
        alert('发布成功')
        this.$router.push('/home')
      }
    },
    async changCat(i) {
      let id = this.$refs['catalog'][i].value
      this.catalogs = this.catalogs.slice(0, i + 1)
      let res = await fetch(SERVER+'api/artical_type/'+id)
      let arr = await res.json()
      if(arr.length) {
        this.catalogs.push(arr)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
