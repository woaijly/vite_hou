<script setup>
import {
  onMounted,
  reactive,
  ref,
} from 'vue';

import dayjs from 'dayjs';
import {
  useRoute,
  useRouter,
} from 'vue-router';

import {
  authAdmin,
  menuSelectlist,
  updateUser,
} from '../../../api';

const route=useRoute()
console.log(route);


const paginationData = ref({
  pageNum: 1,
  pageSize: 10,
});
// 列表数据
const tableData = ref({
  list: [],
  total: 0,
});

onMounted(() => {
  getListData();
  menuSelectlist().then(({ data }) => {
    // console.log("nihao",data);
    
    options.value = data.data;
  });

  
  
});
// 请求列表
const getListData = () => {
  authAdmin(paginationData.value).then(({ data }) => {
    // console.log(data, "authAdmin");
    const { list, total } = data.data;
    list.forEach((item) => {
      item.create_time = dayjs(item.create_time).format("YYYY-MM-DD");
    });
    tableData.value.list = list;
    tableData.value.total = total;
  });
};
const options = ref([]);
// 根据权限匹配名i在
const permissionName = (id) => {
  // console.log(id,"id");
  // console.log(op);
  // 注意如果有括号需要有一个return返回值
  const data = options.value.find(item => {
    return  item.id === id;
  });
  // console.log(data,"data");
  
  return data ? data.name : "未找到权限";
};

const open = (rowData) => {
  dialogVisible.value = true;
  Object.assign(form, {
    mobile: rowData.mobile,
    name: rowData.name,
    permissions_id: rowData.permissions_id,
  });
};
// 分页回调函数
// 点击页码的回调
const handleSizeChange = (val) => {
  paginationData.value.pageSize = val;
  getListData();
};
//点击当前页的回调
const handleCurrentChange = (val) => {
  paginationData.value.pageNum = val;
  getListData();
};
// 弹窗
const dialogVisible = ref(false);
// 关闭弹窗的方法
const closeEvent = () => {
  dialogVisible.value = false;
  getListData();

  fromRef.value.resetFields();
};
// 编辑表单
const fromRef = ref();
const form = reactive({
  name: "",
  permissions_id: "",
});
// 表单提交
const confirm = async (formEl) => {
  // console.log(formEl);
  
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { name, permissions_id } = form;
      updateUser({ name, permissions_id }).then(({ data }) => {
        if (data.code === 10000) {
          closeEvent();
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const rules = reactive({
  name: [{ required: true, message: "请填写昵称", trigger: "blur" }],
  permissions_id: [{ required: true, message: "请选择菜单权限", trigger: "blur" }],
});
</script>

<template>
  <panel-header :route="route"/>

  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="permissions_id" label="所属组别">
      <template #default="scope">
        {{ permissionName(scope.row.permissions_id) }}
      </template>
    </el-table-column>
    <el-table-column prop="mobile" label="手机号" />
    <el-table-column prop="active" label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.active ? 'success' : 'danger'">{{
          scope.row.active ? "正常" : "失效"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="active" label="创建时间">
      <template #default="scope">
        <div class="flex-box">
          <el-icon> <Clock /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </div>  
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
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
  <el-dialog
    v-model="dialogVisible"
    :before-close="closeEvent"
    title="添加权限"
    width="500"
  >
    <el-form
      ref="fromRef"
      label-width="100px"
      label-position="left"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="permissions_id">
        <el-select
          v-model="form.permissions_id"
          placeholder="请选择菜单权限"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirm(fromRef)">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
</style>
 
 
 
 
 
 
