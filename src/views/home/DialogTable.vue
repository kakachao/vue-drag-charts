<template>
  <div>
    <a-modal v-bind="$attrs" title="数据来源" :width="800" :footer="false">
      <div style="margin-bottom: 12px;">
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <plus-circle-outlined />
          </template>
          添加字段
        </a-button>,
      </div>
      <a-table :columns="columns" :data-source="tableData" bordered :scroll="{y:520}" :pagination="false">
        <template #bodyCell="{ column, text,record }">
          <template v-if="['name', 'value'].includes(column.dataIndex)">
            <div>
              <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]"
                style="margin: -5px 0" />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div v-if="editableData[record.id]">
              <a-button shape="circle" style="margin-right: 20px;" @click="handleCancel(record.id)">
                <template #icon>
                  <close-outlined />
                </template>
              </a-button>
              <a-button type="primary" shape="circle" @click="handleSure(record.id)">
                <template #icon>
                  <check-outlined />
                </template>
              </a-button>
            </div>
            <div v-else>
              <a-button type="primary" shape="circle" style="margin-right: 20px;" @click="handleEdit(record.id)">
                <template #icon>
                  <edit-outlined />
                </template>
              </a-button>
              <a-button type="danger" shape="circle" @click="handleDelete(record.id)">
                <template #icon>
                  <delete-outlined />
                </template>
              </a-button>
            </div>

          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script setup>
import { deepClone } from "@/utils/index.js";
import { computed, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';

const columns = [{
  title: '字段',
  dataIndex: 'name',
  align: 'center'
}, {
  title: '值',
  dataIndex: 'value',
  align: 'center'
}, {
  title: '操作',
  dataIndex: 'operation',
  align: 'center',
  width: 120

}];

const props = defineProps({
  data: Object | Array,
})
const editableData = reactive({});
const currentEditData = ref({})
let tableData = computed(() => {
  return deepClone(props.data);
})

const handleAdd = () => {
  currentEditData.value = {
    id: tableData.value.length,
    name: '',
    value: ''
  }
  editableData[currentEditData.value.id] = currentEditData.value
  props.data.push(currentEditData.value)
}
const handleEdit = (id) => {
  console.log(id)
  editableData[id] = currentEditData.value = deepClone(tableData.value.filter(item => id === item.id)[0]);
  console.log(editableData)
}

const handleDelete = (id) => {
  let index = tableData.value.findIndex(item => item.id == id)
  props.data.splice(index, 1)
  message.success('删除成功')
}
const handleCancel = (id) => {
  delete editableData[id]
  if (!currentEditData.value.name) {
    let index = tableData.value.findIndex(item => item.id == id)
    props.data.splice(index, 1)
  }

}
const handleSure = (id) => {
  // Object.assign(tableData.value.filter(item => id === item.id)[0], editableData[id]);
  Object.assign(props.data.filter(item => id === item.id)[0], editableData[id]);
  delete editableData[id];
  if (currentEditData.value.name) {
    message.success('修改成功')
  } else {
    message.success('新增成功')

  }
}
</script>

<style lang="less" scoped>

</style>