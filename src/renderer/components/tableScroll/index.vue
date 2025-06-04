<template>
  <div>
    <el-table size="mini" :header-cell-style="{ background: headerColor }">
      <el-table-column label="文件名称"></el-table-column>
      <el-table-column label="文件路径"></el-table-column>
      <el-table-column label="替换数量" align="center"></el-table-column>
      <el-table-column label="替换状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
    <div
      ref="listContainer"
      class="list-container"
      @scroll.passive="scrollHandle"
      :style="{
        '--rowHeight': oneHeight + 'px',
        height: height,
      }"
    >
      <div class="list" ref="list" :style="listBlankPadding">
        <div class="item" v-for="(item, index) in showList" :key="index">
          <el-table :data="[item]" :show-header="false" size="mini" @cell-click="cellClick">
            <el-table-column prop="row" label="文件名称" show-overflow-tooltip>
              <template slot-scope="{ row }">
                <i
                  v-if="row.type !== 'file'"
                  class="el-icon-folder-opened"
                  style="
                    font-size: 16px;
                    color: #ffd04a;
                    transform: translateY(2px);
                  "
                ></i>
                <i
                  v-if="row.type === 'file'"
                  class="el-icon-tickets"
                  style="font-size: 16px; transform: translateY(2px)"
                ></i>
                {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column label="文件路径" show-overflow-tooltip>
              <template slot-scope="{ row }">
                {{ row.path }}
              </template>
            </el-table-column>
            <el-table-column label="查找到数量" align="center">
              <template slot-scope="{ row }">
                {{ row.num }}
              </template>
            </el-table-column>
            <el-table-column label="替换状态" align="center">
              <template> 成功 </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{ row }">
                <span
                  style="color: #409eff; cursor: pointer"
                  type="text"
                  @click="handleOpen(row)"
                  >打开文件夹</span
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    oneHeight: {
      type: Number,
      default: 36,
    },
    height: {
      type: String,
      default: "100%",
    },
    headerColor: {
      type: String,
      default: "#C2E7B0",
    },
  },
  data() {
    return {
      start: 0,
      containterHeight: 0,
      // 单页面也是的数量
      showNumber: 0,
    };
  },
  computed: {
    end() {
      // 不能最直接取start+showNumber,要判断数据有没有
      //   return this.list[this.start + this.showNumber]
      //     ? this.start + this.showNumber
      //     : this.list.length - 1;
      return Math.min(this.start + this.showNumber, this.list.length);
    },

    listBlankPadding() {
      return {
        paddingTop: this.start * this.oneHeight + "px",
        paddingBottom: (this.list.length - this.end) * this.oneHeight + "px",
      };
    },
    // 可视数组
    showList() {
      return this.list.slice(this.start, this.end);
    },
  },

  mounted() {
    this.getListHeight();
    window.onresize = this.getListHeight;
  },
  methods: {
    async cellClick(row, column, cell, event) {
      if (column.label !== "文件路径") return;
      try {
        await navigator.clipboard.writeText(row.path);
        this.$notify({
          type: "success",
          title: "操作提醒",
          message: `复制路径成功`,
        });
      } catch (err) {
        this.$notify({
          type: "error",
          title: "操作提醒",
          message: `复制路径失败`,
        });
      }
    },
    handleOpen(row) {
      this.$ipcRenderer.send("open_file", row);
    },
    scrollHandle() {
      const marginTop = this.$refs["listContainer"].scrollTop;
      // ~~等于取整操作
      this.start = ~~(marginTop / this.oneHeight);

      // 第一种改变填充进度条时，需要改变改变顶部的位置
      // this.$refs["list"].style.transform = `translateY(${marginTop}px)`;
    },
    getListHeight() {
      this.$nextTick(() => {
        // 头部和底部会有显示两个半条的情况，所以+2
        this.showNumber =
          ~~(this.$refs["listContainer"].offsetHeight / this.oneHeight) + 2;
      });
    },
  },
};
</script>
  
  <style scoped>
.list-container {
  width: 100%;
  overflow-y: auto;
  position: relative;
}

.phantom {
  width: 10px;
  z-index: -1;
  position: absolute;
}

.list {
  position: absolute;
  inset: 0;
}

.item {
  height: var(--rowHeight);
}

::v-deep .el-table__empty-block {
  display: none !important;
}
</style>