<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      size="mini"
      height="784"
      row-key="path"
      @cell-click="cellClick"
      :row-class-name="tableRowClassName"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="row" label="文件名称" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <i
            v-if="row.type !== 'file'"
            class="el-icon-folder-opened"
            style="font-size: 16px; color: #ffd04a; transform: translateY(2px)"
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
      <el-table-column
        label="查找到数量"
        align="center"
        v-if="option?.filecontented"
      >
        <template slot-scope="{ row }">
          {{ row.num }}
        </template>
      </el-table-column>
      <el-table-column
        label="替换状态"
        align="center"
        v-if="option?.filecontented"
      >
        <template slot-scope="{ row }">
          <span v-if="row.type === 'file'">
            {{
              row.state === 0
                ? ""
                : row.state === 1
                ? "替换中"
                : row.state === 2
                ? "成功"
                : "失败"
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left">
        <template slot-scope="{ row }">
          <span
            style="color: #409eff; cursor: pointer"
            type="text"
            @click="handleOpen(row)"
            >打开文件夹</span
          >

          <span
            style="color: #409eff; cursor: pointer; margin-left: 10px"
            type="text"
            v-if="row.num && row.num !== 0 && vertifyType(row)"
            @click="handleReplace(row)"
            >替换内容</span
          >

          <span
            style="color: #409eff; cursor: pointer; margin-left: 10px"
            type="text"
            v-if="option?.filecontented && row.type !== 'file'"
            @click="handleReplace(row)"
            >替换全部</span
          >
          <span
            style="color: #409eff; cursor: pointer; margin-left: 10px"
            type="text"
            v-if="row.type === 'file'"
            @click="handlePreview(row)"
            >查看文件</span
          >
        </template>
      </el-table-column>
    </el-table>

    <div ref="gallery" style="display: none">
      <img v-for="(img, i) in images" :key="i" :src="img" />
    </div>

    <FilePreview ref="preview"></FilePreview>
  </div>
</template>

<script>
import FilePreview from "@/components/filePreview";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
export default {
  components: { FilePreview },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    path: {
      type: String,
      default: () => "",
    },
    option: {
      type: Object,
      default: () => {},
    },
    replaceOption: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      viewer: null,
      images: [],
      imageExtensions: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "svg",
        "ico",
        "tiff",
        "tif",
        "avif",
        "heic",
      ],
      viewableExtensions: [
        "txt",
        "md",
        "html",
        "htm",
        "css",
        "js",
        "ts",
        "json",
        "xml",
        "csv",
        "log",
        "ini",
        "yml",
        "yaml",
        "py",
        "java",
        "c",
        "cpp",
        "h",
        "php",
        "rb",
        "sh",
        "bat",
        "sql",
      ],
      videos: ["mp4", "webm", "ogg", "ogv", "mov"],
      audios: ["mp3", "wav", "ogg", "flac", "aac", "m4a"],
    };
  },
  watch: {
    images() {
      if (this.viewer) {
        this.viewer.destroy();
        this.viewer = null;
      }
    },
  },
  methods: {
    vertifyType(row) {
      const ext = row.path.split(".").pop().toLowerCase();
      return this.viewableExtensions.includes(ext);
    },
    handlePreview(row) {
      const loading = this.$loading({
        lock: true,
        text: "请稍等...",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
      });
      const ext = row.path.split(".").pop().toLowerCase();
      if (this.imageExtensions.includes(ext)) {
        this.images = [row.path];
        this.$nextTick(() => {
          if (!this.viewer) {
            this.viewer = new Viewer(this.$refs.gallery, {
              hidden: () => this.viewer.destroy(),
            });
          }
          this.viewer.show();
          loading.close();
        });
      } else if (this.viewableExtensions.includes(ext)) {
        setTimeout(() => {
          this.$ipcRenderer.invoke("preview_text", row.path).then((res) => {
            if (res.code === 200) {
              this.$refs.preview.show("content", res.data);
            } else {
              this.$notify({
                type: "error",
                title: "操作提醒",
                message: `预览失败`,
              });
            }
            loading.close();
          });
        }, 100);
      } else if (this.videos.includes(ext)) {
        this.$refs.preview.show("video", row.path);
        loading.close();
      } else if (this.audios.includes(ext)) {
        this.$refs.preview.show("audio", row.path);
        loading.close();
      } else {
        loading.close();
        this.$notify({
          type: "error",
          title: "操作提醒",
          message: `暂不支持预览该文件类型`,
        });
      }
    },
    handleOpen(row) {
      this.$ipcRenderer.send("open_file", row);
    },
    tableRowClassName({ row }) {
      if (row.type === "file") {
        return "file";
      } else {
        return "directory";
      }
    },
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
    handleReplace(row) {
      if (!this.replaceOption.to) {
        this.$confirm("确认替换为空吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            fn();
          })
          .catch(() => {
            this.$emit("writeReplace");
            return;
          });
      } else {
        this.$confirm("确认开始替换吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            fn();
          })
          .catch(() => {});
      }

      const fn = () => {
        if (row.type === "file") {
          row.state = 1;
          this.$ipcRenderer
            .invoke("replace_file_once", row, this.replaceOption)
            .then((res) => {
              if (res.code === 200) {
                row.state = 2;
                this.$notify({
                  type: "success",
                  title: "操作提醒",
                  message: `替换成功${row.num}个`,
                });
              } else {
                row.state = 3;
                this.$notify({
                  type: "error",
                  title: "操作提醒",
                  message: `替换失败, ${res.err}`,
                });
              }
            });
        } else {
          this.$emit("handleAllreplace");
          setTimeout(() => {
            this.$ipcRenderer.send("replace_file_all", row, this.replaceOption);
          }, 500)
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  background: transparent !important;
}

.el-table ::v-deep .file {
  background: #f4f4f5 !important;
}

.el-table ::v-deep .directory {
  background: #fdf6ec !important;
}

::v-deep .el-table__body-wrapper {
  height: 100% !important;
}
</style>