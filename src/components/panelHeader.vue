<script setup>
import { onMounted } from 'vue';

const props=defineProps({route:{type:Object}})
// onMounted(()=>{
//   console.log(props);
  
// })
</script>
<template>
  <div class="panel-heading">
    <div class="panel-lead">
      <div class="title">{{props.route.meta.name}}</div>
      <p class="description">
       {{props.route.meta.describe}}
      </p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.panel-heading {
  padding: 15px;
  background-color: #fff;
  border-color: #e8e8e8;
	position: relative;
  .panel-lead {
    font-size: 14px;
    .title {
      font-weight: bold;
      font-size: normal;
    }
    .description {
      margin-top: 5px;
    }
  }
}
</style>
