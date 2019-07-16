<template lang="html">
  <header class="ydc-header">
    <div class="ydc-entered">
        <div class="ydc-header-content ydc-flex">
            <div class="ydc-column">
                <a href="index.html" class="ydc-column-ydc-logo">
                    <img src="../assets/images/icon/ydc-logo.png" title="" about="" alt="">
                </a>
            </div>
            <div class="ydc-column">
                <div class="ydc-column-user">
                    <div class="ydc-user-photo">
                        <a href="javascript:;">
                            <img src="../assets/images/icon/photo.png" title="" about="" alt="">
                        </a>
                    </div>
                    <div class="ydc-user-info">
                        <div class="ydc-user-info-name">
                            <a href="javascript:;">一点车</a>
                        </div>
                        <div class="ydc-user-info-func ydc-flex">
                            <span class="ydc-tag">账号审核中</span>
                            <span class="ydc-mal">
                                <i class="ydc-icon ydc-icon-mail fl"></i>
                                <em>12</em>
                            </span>
                            <a href="javascript:;">退出</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.ydc-entered {
    background-color: #2b2b2b;
    -webkit-transform: translate3d(0,-30px,0);
    transform: translate3d(0,-30px,0);
    -webkit-transition: opacity .5s,-webkit-transform .5s;
    opacity: .05;
}

.ydc-entered {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}

.ydc-header-content {
    margin: 0 auto;
    width: 1180px;
    height: 70px;
}

.ydc-column {
    -ms-flex: 1 1 0px;
    -webkit-flex: 1 1 0%;
    flex: 1 1 0%;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    max-width: 100%
}

.ydc-column-ydc-logo {
    width: 130px;
    display: block;
    margin-top: 5px;
}

.ydc-column-ydc-logo img {
    width: 100%;
    height: auto;
    display: block;
    border: none;
}

.ydc-column-user {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    margin-top: 15px;
}

.ydc-user-photo {
    width: 40px;
    height: 40px;
    margin-right: 25px;
}

.ydc-user-photo a img {
    border-radius: 100%;
    width: 100%;
    height: auto;
    display: block;
    border: none;
}

.ydc-user-info-name a {
    font-size: 16px;
    color: #fff;
    font-weight: normal;
}

.ydc-user-info {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.ydc-tag {
    display: inline-block;
    color: #ffffff;
    font-size: 12px;
    height: 17px;
    line-height: 18px;
    margin: 0 5px;
    padding: 0 8px;
    cursor: pointer;
    background: #ff6565;
}

.ydc-user-info-func {
    padding-top: 4px;
}

.ydc-user-info-func a {
    position: relative;
    color: #fff;
}

.ydc-mal {
    height: 22px;
    line-height: 18px;
}
</style>
