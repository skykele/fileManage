<template>
  <el-drawer
    title="替换进度"
    :visible.sync="drawer"
    size="50%"
    :before-close="handleClose"
  >
    <!-- 成功 -->
    <TableScroll
      :list="success"
      height="453px"
      headerColor="#C2E7B0"
      :key="11"
    ></TableScroll>
    <!-- 失败 -->
    <TableScroll
      :list="error"
      height="288px"
      headerColor="#FBC4C4"
      :key="22"
    ></TableScroll>
  </el-drawer>
</template>

<script>
import TableScroll from "@/components/tableScroll";
import { UTable, UTableColumn } from "umy-ui";
import "umy-ui/lib/theme-chalk/index.css";
export default {
  components: { UTable, UTableColumn, TableScroll },
  props: {
    success: {
      type: Array,
      default: () => [{}, {}, {}, {}],
    },
    error: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    handleClose() {
      this.drawer = false;
    },
    show() {
      this.drawer = true;
    },
  },
};
</script>