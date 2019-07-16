<template lang="html">
  <div class="ydc-entered-box">
		<div class="ydc-content-right">
			<RightHeader/>
			<RightBanner/>
			<!-- gongGao begin -->
			<div class="ydc-loading-box">
        <TabPanel/>
			</div>
			<!-- gongGao End -->
		</div>
	</div>
</template>

<script>
import TabPanel from '@/components/TabPanel';
import RightHeader from '@/components/RightHeader';
import RightBanner from '@/components/RightBanner';

export default {
  name: 'index',
  components: {
    TabPanel, RightHeader, RightBanner
  }
}
</script>

<style lang="css" scoped>
.ydc-loading-box {
    margin-top: 20px;
    border: 1px solid #ddd;
    /* border-radius: 53px; */
    padding-bottom: 40px;
}
</style>
