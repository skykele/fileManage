<template>
  <div class="app-container">
    <div class="xn_header mb10">
      <el-card class="header_card" shadow="never">
        <div class="el_card_h">
          <el-button
            size="small"
            type="primary"
            class="mr10"
            @click="handleSelectPath"
            >选择路径</el-button
          >
          <el-input
            v-model="path"
            size="small"
            clearable
            class="mr10 ml10"
            placeholder="请选择或输入路径"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            class="ml10"
            @click="handleFilter"
            icon="el-icon-setting"
            >配置项</el-button
          >
          <el-button
            size="small"
            type="primary"
            class="ml10"
            @click="handleReplace"
            icon="el-icon-refresh"
            >替换内容</el-button
          >
          <el-button
            size="small"
            type="primary"
            class="ml10"
            @click="handleReplaceRecord"
            icon="el-icon-refresh"
            >替换记录</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleStart"
            >开始搜索</el-button
          >
        </div>
      </el-card>
    </div>

    <div class="footer">
      <el-card class="table_data_file">
        <files
          :tableData="fileList"
          :path="path"
          :option="option"
          @writeReplace="handleReplace"
          :replaceOption="replaceOption"
          @handleAllreplace="handleAllreplace"
        ></files>
      </el-card>
    </div>

    <filter-file ref="filter" @filter="handleFilterConfirm"></filter-file>

    <replace-content
      ref="replace"
      @replace="handleReplaceConfirm"
    ></replace-content>

    <replace-progress
      ref="replaceProgress"
      :success="result.success"
      :error="result.error"
    ></replace-progress>
  </div>
</template>

<script>
import FilterFile from "../components/filterFile";
import ReplaceContent from "../components/replaceContent";
import ReplaceProgress from "../components/replaceProgress";
import Files from "./files";
export default {
  components: { FilterFile, Files, ReplaceContent, ReplaceProgress },
  name: "Index",
  data() {
    return {
      path: "",
      fileList: [],
      isSet: false,
      option: {},
      replaceOption: {},
      loading: null,
      result: {
        success: [],
        error: [],
      },
    };
  },
  created() {
    this.$ipcRenderer.on("scan-progress", this.handleProgress);
    this.$ipcRenderer.on("replace-progress", this.replaceProgress);
  },
  methods: {
    handleAllreplace() {
      this.result = {
        success: [],
        error: [],
      };

      this.$refs.replaceProgress.show();
    },
    handleReplaceRecord() {
      this.$refs.replaceProgress.show();
    },
    handleReplace() {
      this.$refs.replace.show();
    },
    handleProgress(e, { percent, filePath }) {
      this.loading && this.loading.setText(`${filePath}—${percent}%`);
    },
    handleSelectPath() {
      this.$ipcRenderer.invoke("select_path").then((res) => {
        res?.path && (this.path = res?.path);
      });
    },
    handleReplaceConfirm(option) {
      this.replaceOption = option;
      this.$refs.replace.hide();
    },
    handleFilter() {
      this.$refs.filter.show();
    },
    handleFilterConfirm(option) {
      this.isSet = true;
      this.option = option;
      this.$refs.filter.hide();
    },
    replaceProgress(e, res) {
      const file = this.findNodeByPath(this.fileList, res.data.path);
      if (res.code === 200) {
        if (file) {
          file.state = 2;
          this.result.success.unshift(res.data);
        }
      } else {
        file.state = 3;
        this.result.error.unshift(res.data);
      }
    },
    findNodeByPath(data, path) {
      for (const item of data) {
        if (item.path === path) return item;
        if (item.children) {
          const result = this.findNodeByPath(item.children, path);
          if (result) return result;
        }
      }
      return null;
    },
    handleStart() {
      if (!this.path) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请选择或输入指定路径`,
        });
      }

      if (!this.isSet) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请先进行设置配置项再继续`,
        });
      }

      if (
        !this.option.filtered &&
        !this.option.appointed &&
        !this.option.filenamed &&
        !this.option.filecontented
      ) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请至少配置一项（除了默认）`,
        });
      }

      this.loading = this.$loading({
        lock: true,
        text: "查找中",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
      });

      const params = {
        path: this.path,
        option: this.option,
      };

      this.$ipcRenderer.invoke("start", params).then((res) => {
        this.loading.close();
        if (res.code === 200) {
          this.fileList = res.data;
          if (this.fileList.length === 0) {
            this.$notify({
              type: "warning",
              title: "操作提醒",
              message: `搜索结果条数为空`,
            });
          }
        } else {
          this.$notify({
            type: "error",
            title: "操作提醒",
            message: `正则表达式错误，${res.err}`,
          });
        }
      });
    },
  },
};
</script>
<style  lang="scss" scoped>
.app-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-image: url("../assets/images/svg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .footer {
    flex: 1;
    display: flex;
    flex-direction: column;

    .el-card {
      flex: 1;
    }
  }
}

.options {
  padding-top: 20px;
}

.xn_header {
  .el_card_h {
    display: flex;
    align-items: center;
  }
}

.table_data_file ::v-deep .el-card__body {
  padding: 0 !important;
}

.el-card {
  background-color: transparent !important;
}

.header_card ::v-deep .el-card__body {
  padding: 0 !important;
  border: none !important;
}
</style>