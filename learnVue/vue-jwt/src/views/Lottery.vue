<template>
 <div>
     <p>彩票</p>
     <el-button v-allow="'edit'">编辑</el-button>
     <el-button v-allow="'add'">添加</el-button>
 </div>
</template>

<script>
import { allow } from '../directives/index';

export default {
  directives: {
    allow,
  },
};
</script>
