<template>
  <div>
    <el-dialog
      title="查看文件"
      :visible.sync="dialogVisible"
      width="80%"
      top="0vh"
      :before-close="handleClose"
    >
      <div class="body_option">
        <img
          :src="content"
          v-if="type === 'image'"
          alt=""
          style="width: 100%"
        />
        <video
          :src="content"
          v-if="type === 'video'"
          controls
          style="width: 100%"
        ></video>
        <audio
          :src="content"
          v-if="type === 'audio'"
          controls
          style="width: 100%"
        ></audio>
        <vab-quill
          v-if="type === 'content'"
          readonly
          v-model="content"
          :min-height="500"
          :options="options"
        ></vab-quill>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
import vabQuill from "@/plugins/vabQuill";
export default {
  components: { vabQuill },
  data() {
    return {
      type: "",
      content: "",
      dialogVisible: false,
      options: {
        theme: "snow",
        bounds: document.body,
        debug: "warn",
        modules: {
          toolbar: false,
        },
        placeholder: "请输入...",
        readOnly: true,
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    show(type, content) {
      this.type = type;
      this.content = content;
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.body_option {
  max-height: 80vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
}

.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  justify-content: space-between;
}

::v-deep .el-dialog {
  margin-top: 0 !important;
}

.zhuanyi {
  font-size: 14px;
  color: #999;
  text-decoration: underline;
  transform: translateY(-1px);
}

::v-deep .ql-toolbar {
  display: none;
}

::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 1px solid #ccc;
}
</style>