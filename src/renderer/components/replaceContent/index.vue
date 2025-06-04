<template>
  <el-dialog
    title="内容替换"
    :visible.sync="replaceShow"
    width="50%"
    top="0vh"
    :before-close="handleClose"
  >
    <el-form label-position="left" label-width="120px" size="small">
      <el-form-item label="直接替换">
        <el-checkbox v-model="option.isReplace">直接替换内容</el-checkbox>
        <el-checkbox v-model="option.isReg" v-if="!option.isReplace"
          >正则表达式</el-checkbox
        >
      </el-form-item>
      <el-form-item label="将原内容中" v-if="!option.isReplace">
        <el-input
          type="textarea"
          :placeholder="
            option.isReg
              ? '请输入正则表达式匹配已获取的匹配结果（已经匹配到的内容中替换某一处）'
              : '搜索匹配到的内容中替换某一处'
          "
          v-model="option.form"
          :autosize="{ minRows: 5, maxRows: 5 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="替换为">
        <el-input
          type="textarea"
          placeholder="请输入替换内容"
          v-model="option.to"
          :autosize="{ minRows: 5, maxRows: 5 }"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="handleConfirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      replaceShow: false,
      option: {
        isReplace: true,
        isReg: false,
        form: "",
        to: "",
      },
    };
  },
  watch: {
    "option.isReplace"(n) {
      if (n) {
        this.option.isReg = false;
        this.option.form = "";
      }
    },
  },
  methods: {
    handleClose() {
      this.replaceShow = false;
    },
    handleConfirm() {
      if (!this.option.isReplace && !this.option.form) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入要替换的内容`,
        });
      }
      if (!this.option.to) {
        this.$confirm("确认替换为空吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit("replace", this.option);
          })
          .catch(() => {});
      } else {
        this.$emit("replace", this.option);
      }
    },
    show() {
      this.replaceShow = true;
    },
    hide() {
      this.replaceShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-dialog {
  margin-top: 0 !important;
}

::v-deep .el-dialog {
  // background-image: url("../../assets/images/R.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>