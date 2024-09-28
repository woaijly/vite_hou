<script setup>
import {
  onMounted,
  reactive,
} from 'vue';

import dayjs from 'dayjs';
import { useRoute } from 'vue-router';

import {
  Delete,
  InfoFilled,
  Plus,
} from '@element-plus/icons-vue';

import {
  adminOrder,
  updateOrder,
} from '../../../api';

const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
});
// 列表数据
const tableData = reactive({
  list: [],
  total: 0,
});
const route = useRoute();

onMounted(() => {
  getlist();
});
const getlist = (params={}) => {
  adminOrder({...paginationData,...params}).then(({ data }) => {
    // console.log(data);

    const { list, total } = data.data;
    list.forEach((item) => {
      item.create_time = dayjs(item.create_time).format("YYYY-MM-DD");
    });
    tableData.list = list;
    tableData.total = total;
  });
};
const statusMap = (key) => {
  const obj = {
    已取消: "info",
    待支付: "warning",
    已完成: "success",
  };
  return obj[key];
};
const searchForm = reactive({
  out_trade_no: "",
});
const confirmEvent = async (id) => {
  const { data } = await updateOrder({ id });
  if (data.code === 10000) {
    getlist();
  }
};

const onsubmit = () => {
  getlist(searchForm);
};

const handleSizeChange = (val) => {
  paginationData.value.pageSize = val;
  getlist();
};
//点击当前页的回调
const handleCurrentChange = (val) => {
  paginationData.value.pageNum = val;
  getlist();
};
</script>

<template>
  <panel-header :route="route" />
  <div class="form">
    <el-form :inline="true" :model="searchForm">
      <el-form-item prop="out_trade_no">
        <el-input v-model="searchForm.out_trade_no" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="tableData.list">
    <el-table-column
      prop="out_trade_no"
      label="订单号"
      fixed="left"
      width="151"
    ></el-table-column>
    <el-table-column prop="hospital_name" label="就诊医院"></el-table-column>
    <el-table-column prop="service_name" label="陪诊服务"></el-table-column>
    <el-table-column label="陪护师头像">
      <template #default="scope">
        <el-image style="width: 40px; height: 40px" :src="scope.row.companion.avatar" />
      </template>
    </el-table-column>
    <el-table-column label="陪护师手机" width="120">
      <template #default="scope">
        {{ scope.row.companion.mobile }}
      </template>
    </el-table-column>
    <el-table-column prop="price" label="总价"></el-table-column>
    <el-table-column prop="paidPrice" label="已付"></el-table-column>
    <el-table-column label="下单时间" width="120">
      <template #default="scope">
        {{ dayjs(scope.row.order_start_time).format("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <el-table-column label="订单状态">
      <template #default="scope">
        <el-tag :type="statusMap(scope.row.trade_state)">{{
          scope.row.trade_state
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="service_state" label="接单状态"></el-table-column>
    <el-table-column prop="tel" label="联系人电话" width="120"></el-table-column>
    <el-table-column label="操作" width="100" fixed="right">
      <template #default="scope">
        <el-popconfirm
          v-if="scope.row.trade_status === '待服务'"
          title="确定要完成嘛？"
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          @confirm="confirmEvent(scope.row.out_trade_no)"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button type="primary" link>服务完成</el-button>
          </template>
        </el-popconfirm>

        <el-button v-else type="primary" link disabled>暂无服务</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-info">
    <el-pagination
      v-model:current-page="paginationData.pageNum"
      :page-size="paginationData.pageSize"
      size="small"
      :background="false"
      layout="slot, prev, pager, next"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <span>总页数：{{ tableData.total }}</span>
    </el-pagination>
  </div>
</template>
<style lang="less" scoped>
.form {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>
