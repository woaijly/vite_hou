<script setup>
import {
  nextTick,
  onMounted,
  reactive,
  ref,
} from 'vue';

import {
  dayjs,
  ElMessage,
} from 'element-plus';
import { useRoute } from 'vue-router';

import {
  Delete,
  InfoFilled,
  Plus,
} from '@element-plus/icons-vue';

import {
  companionList,
  deleteCompanion,
  photoList,
  v3pzCompanion,
} from '../../../api';

const dialogVisible = ref(false);
const fromRef = ref();
const form = reactive({
  id: "",
  mobile: "",
  active: 1,
  age: 12,
  avatar: "",
  name: "",
  sex: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  avatar: [{ required: true, message: "请选择头像" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  mobile: [{ required: true, message: "请填写手机号", trigger: "blur" }],
});
const confirm = async (formEl) => {
  // console.log("数据", formEl);

  // const formEl = fromRef.value;
  // console.log(formEl);

  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      v3pzCompanion(form).then(({ data }) => {
        if (data.code === 10000) {
          ElMessage.success("成功");
          closeEvent();
          getlist();
        } else {
          ElMessage.error(data.message);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const open = (rowData = {}) => {
  // console.log(rowData);

  dialogVisible.value = true;
  // 弹窗打开的form生成是异步的
  nextTick(() => {
    if (rowData) {
      Object.assign(form, rowData);
    }
  });
};
//关闭弹窗的回调
const closeEvent = () => {
  dialogVisible.value = false;
  // 重置表单
  fromRef.value.resetFields();
  //tree选择重置
  // treeRef.value.setCheckedKeys(defTree);
};
// 关闭弹窗回调
const closeEventt = () => {
  dialogImgVisible.value = false;
  // 重置表单
  fromRef.value.resetFields();
  //tree选择重置
  // treeRef.value.setCheckedKeys(defTree);
};

const dialogImgVisible = ref(false);

const fileList = ref([]);
onMounted(() => {
  photoList().then(({ data }) => {
    fileList.value = data.data;
  });
  getlist();
});

const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
});
// 列表数据
const tableData = reactive({
  list: [],
  total: 0,
});
const getlist = () => {
  companionList(paginationData).then(({ data }) => {
    // console.log(data);

    const { list, total } = data.data;
    list.forEach((item) => {
      item.create_time = dayjs(item.create_time).format("YYYY-MM-DD");

    })
    tableData.list = list;
    tableData.total = total;
  });
};

const selectindex = ref(0);

const confirmImage = () => {
  form.avatar = fileList.value[selectindex.value].url;
  dialogImgVisible.value = false;
};

const handleSizeChange = (val) => {
  paginationData.value.pageSize = val;
  getListData();
};
//点击当前页的回调
const handleCurrentChange = (val) => {
  paginationData.value.pageNum = val;
  getListData();
};
const selecttabledata = ref([]);
const handleSelectionChange = (val) => {
  selecttabledata.value = val.map(item=>({id:item.id}));
};
// 点击删除的事件
const confirmEvent = () => {
  if (!selecttabledata.value.length) {
    return ElMessage.warning("请选择要删除的数据");
  }
  deleteCompanion({ id: selecttabledata.value }).then(({ data }) => {
    if (data.code === 10000) {
      getlist();
    }
  });
};
// 取消删除操作
const cancelEvent=() => {
  
}
const route=useRoute()
</script>

<template>
    <panel-header :route="route"/>
  <div class="btns">
    <el-button :icon="Plus" type="" size="small" @click="open(null)">新增</el-button>
    <el-popconfirm
      title="确定要删除嘛？"
      confirm-button-text="是"
      cancel-button-text="否"
      :icon="InfoFilled"
      icon-color="#626AEF"
      @confirm="confirmEvent"
      @cancel="cancelEvent"
    >
      <template #reference>
        <el-button :icon="Delete" type="danger" size="small">删除</el-button>
      </template>
    </el-popconfirm>
  </div>
  <el-table
    :data="tableData.list"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="昵称" />
    <el-table-column label="头像">
      <template #default="scope">
        <el-image style="width: 50px; height: 50px" :src="scope.row.avatar" />
      </template>
    </el-table-column>
    <el-table-column prop="sex" label="性别">
      <template #default="scope">
        {{ scope.row.sex === "1" ? "男" : "女" }}
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
    title="陪护师添加"
    width="500"
  >
    <el-form
      ref="fromRef"
      label-width="100px"
      label-position="left"
      :model="form"
      :rules="rules"
    >
      <el-form-item v-show="false" label="陪护师ID" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisible = true"
          >点击上传</el-button
        >
        <el-image v-else :src="form.avatar" style="width: 100px; height: 100px">
        </el-image>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择您的性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--  @change="handleChange" -->
        <el-input-number v-model="form.age" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请选择手机号"></el-input>
      </el-form-item>
      <el-form-item label="是否生效" prop="active">
        <el-radio-group v-model="form.active">
          <el-radio :value="1">生效</el-radio>
          <el-radio :value="2">失效</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirm(fromRef)">确认</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogImgVisible"
    :before-close="closeEventt"
    title="选择图片"
    width="680"
  >
    <div class="image-list">
      <div
        v-for="(item, index) in fileList"
        :key="item.name"
        class="img-box"
        @click="selectindex = index"
      >
        <div v-if="selectindex == index" class="select">
          <el-icon color="#fff"><Check /></el-icon>
        </div>
        <el-image style="width: 148px; height: 148px" :src="item.url"></el-image>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmImage">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.btns {
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
