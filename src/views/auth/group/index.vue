<script setup>
import {
  nextTick,
  onMounted,
  ref,
} from 'vue';

import { useRoute } from 'vue-router';

import { Plus } from '@element-plus/icons-vue';

import {
  menuList,
  userGetmenu,
  userSetmenu,
} from '../../../api';

const route=useRoute()

//控制是不是显示弹窗
const dialogVisible = ref(false);

//关闭弹窗的回调
const closeEvent = () => {
  dialogVisible.value = false;
  // 重置表单
  fromRef.value.resetFields();
  //tree选择重置
  treeRef.value.setCheckedKeys(defTree);
};
// 内部的表单数据
const form = ref({
  id: "",
  name: "",
  permission: "",
});

// 树形结构数据
const permissionData = ref([]);

onMounted(async () => {
  // 获取权限数据
  const res = await userGetmenu();
  //  console.log(res.data.data);
  permissionData.value = res.data.data;
  // console.log(permissionData.value);

  // 获取权限数据
  getListData();
  // console.log(tableData.list);
});

// 设置默认节点
const defTree = [4, 5];

// 获取树状结构的数据
const treeRef = ref();
// 表单数据
const fromRef = ref();
const confirm = async (formEl) => {
  // console.log("数据", formEl);

  // const formEl = fromRef.value;
  // console.log(formEl);

  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // console.log("mingzi", form.value.name);

      const res = await userSetmenu({
        name: form.value.name,
        permissions: JSON.stringify(treeRef.value.getCheckedKeys()),
        id: form.value.id,
      });
      closeEvent();
      getListData();
      // console.log(res);
    } else {
      console.log("error submit!", fields);
    }
  });
};
const rules = ref({
  name: [{ required: true, message: "请填写权限名称", trigger: "blur" }],
});

const paginationData = ref({
  pageNum: 1,
  pageSize: 10,
});
// 请求列表数据权限列表
const getListData = () => {
  // console.log(paginationData.value);

  menuList(paginationData.value).then(({ data }) => {
    // console.log(data);
    const { list, total } = data.data;
    // console.log(list, total);

    tableData.value.list = list;
    tableData.value.total = total;
    // console.log(tableData.list);
  });
};
// 打开弹窗
const open = (rowData = {}) => {
  console.log(rowData);

  dialogVisible.value = true;
  // 弹窗打开的form生成是异步的
  nextTick(() => {
    if (rowData) {
      Object.assign(form.value, { id: rowData.id, name: rowData.name });
      treeRef.value.setCheckedKeys(rowData.permission);
    }
  });
};
// 列表数据
const tableData = ref({ list: [], total: 0 });

// 分页回调函数
// 点击页码的回调
const handleSizeChange = (val) => {
  paginationData.value.pageSize=val
  getListData()
}
//点击当前页的回调
const handleCurrentChange = (val) => {
  paginationData.value.pageNum=val
  getListData()
}

</script>

<template>
  <panel-header :route="route"/>
  <div class="btns">
    <el-button :icon="Plus" type="" size="small" @click="open(null)">新增</el-button>
  </div>
 

  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="permissionName" label="菜单权限" width="500" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- 分页 -->
<div class="pagination-info">
<el-pagination
      v-model:current-page="paginationData.pageNum"
      :page-size="paginationData.pageSize "
      size="small"
      :background="false"
      layout="slot, prev, pager, next"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
 
  
        <span>总页数：{{ tableData.total  }}</span>
    
  
    </el-pagination>
</div>
  
  <!-- {{ tableData.list }} -->
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
      <el-form-item v-show="false" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请填写权限名称"></el-input>
      </el-form-item>

      <el-form-item label="权限" prop="permission">
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :default-checked-keys="defTree"
          :data="permissionData"
          show-checkbox
          node-key="id"
          default-expand-all
          check-on-click-node
          :default-expanded-keys="[2]"
        ></el-tree>
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
.btns{
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>
