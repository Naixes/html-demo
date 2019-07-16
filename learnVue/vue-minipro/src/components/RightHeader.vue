<template lang="html">
  <div class="ydc-right-head">
    <div class="ydc-right-head-info">
      <dl>
        <a href="#">
          <dt>总订阅</dt>
          <dd>14</dd>
        </a>
      </dl>
      <dl>
        <a href="#">
          <dt>总阅读</dt>
          <dd>224</dd>
        </a>
      </dl>
      <dl>
        <a href="#">
          <dt>昨日阅读</dt>
          <dd>14</dd>
        </a>
      </dl>
      <dl>
        <a href="#">
          <dt>总数据指数</dt>
          <dd>158</dd>
        </a>
      </dl>
    </div>
    <button class="btn ydc-ne-carousel" @click="$router.push({name: 'release', params: {}})">
      <i class="ydc-icon-shu"></i>
      <span>发布</span>
    </button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.ydc-right-head {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
}

.ydc-right-head-info {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 140px;
    -webkit-flex: 1 1 780px;
    -ms-flex: 1 1 780px;
    flex: 1 1 780px;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    font-weight: 700;
    background-color: #f4f4f4;
    border-radius: 3px;
}

.ydc-right-head-info dl {
    -webkit-flex: 1 1 0%;
    -ms-flex: 1 1 0%;
    flex: 1 1 0%
}

.ydc-right-head-info dl dt {
    color: #757575;
    line-height: 22px;
    font-size:  14px;
    font-weight: 200;
}

.ydc-right-head-info dl dd {
    margin: 8px 0 0;
    font-size: 26px;
    line-height: 37px;
    font-weight: 700;
}

.ydc-right-head-info dl a:hover {
    color: #ff5f5f;
}

.ydc-ne-carousel {
    padding: 8px 12px;
    font-size: 14px;
    min-width: 32px;
    background-color: #ff6565;
    border-color: #ff6565;
    color: #fff;
    width: 130px;
    height: 140px;
    margin-left: 20px;
    font-weight: normal;
}

.ydc-ne-carousel span {
    font-weight: 300;
}
</style>
