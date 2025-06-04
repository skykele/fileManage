<template>
  <div>
    <el-dialog
      title="配置项"
      :visible.sync="dialogVisible"
      width="50%"
      top="0vh"
      :before-close="handleClose"
    >
      <div class="body_option" style="padding-left: 50px; padding-right: 60px">
        <el-form label-position="left" label-width="120px" size="small">
          <el-form-item label="过滤文件夹">
            <el-checkbox v-model="option.fileed" disabled
              >过滤文件夹</el-checkbox
            >
          </el-form-item>
          <el-form-item
            v-if="option.fileed"
            style="border-bottom: 1px solid #ccc; padding-bottom: 10px"
          >
            <el-input
              type="textarea"
              placeholder="多个逗号分割，例如：文件夹1,文件夹2"
              v-model="option.file"
              :autosize="{ minRows: 3, maxRows: 3 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="过滤文件">
            <el-checkbox v-model="option.filtered">过滤后缀文件</el-checkbox>
          </el-form-item>
          <el-form-item
            v-if="option.filtered"
            style="border-bottom: 1px solid #ccc; padding-bottom: 10px"
          >
            <el-input
              type="textarea"
              placeholder="多个逗号分割，例如：vue,js"
              v-model="option.filter"
              :autosize="{ minRows: 3, maxRows: 3 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="指定后缀">
            <el-checkbox v-model="option.appointed">指定后缀文件</el-checkbox>
          </el-form-item>
          <el-form-item
            v-if="option.appointed"
            style="border-bottom: 1px solid #ccc; padding-bottom: 10px"
          >
            <el-input
              type="textarea"
              placeholder="多个逗号分割，例如：vue,js"
              v-model="option.appoint"
              :autosize="{ minRows: 3, maxRows: 3 }"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="指定文件夹">
            <el-checkbox v-model="option.filesnamed">指定文件夹搜索</el-checkbox>
          </el-form-item>
          <el-form-item
            v-if="option.filesnamed"
            style="border-bottom: 1px solid #ccc; padding-bottom: 10px"
          >
            <el-input
              type="textarea"
              placeholder="多个逗号分割，例如：edit,userinfo"
              v-model="option.filesname"
              :autosize="{ minRows: 3, maxRows: 3 }"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="指定文件名">
            <el-checkbox v-model="option.filenamed">指定文件名搜索</el-checkbox>
          </el-form-item>
          <el-form-item
            v-if="option.filenamed"
            style="border-bottom: 1px solid #ccc; padding-bottom: 10px"
          >
            <el-input
              type="textarea"
              placeholder="多个逗号分割，例如：edit,userinfo"
              v-model="option.filename"
              :autosize="{ minRows: 3, maxRows: 3 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="指定文件内容">
            <el-checkbox v-model="option.filecontented"
              >文件内容搜索</el-checkbox
            >
            <el-checkbox v-model="option.regular" v-if="option.filecontented"
              >正则表达式</el-checkbox
            >
            <el-button
              type="text"
              size="mini"
              v-if="option.regular"
              class="ml10 zhuanyi"
              @click="zhuanyiShow = true"
              >转义字符集</el-button
            >
          </el-form-item>
          <el-form-item v-if="option.regular">
            <el-checkbox v-model="option.global" v-if="option.regular"
              >全局匹配</el-checkbox
            >
            <el-checkbox v-model="option.size" v-if="option.regular"
              >大小写区分</el-checkbox
            >
            <el-checkbox v-model="option.multiline" v-if="option.regular"
              >多行匹配</el-checkbox
            >
            <el-checkbox v-model="option.dotAll" v-if="option.regular"
              >匹配换行符</el-checkbox
            >
            <el-checkbox v-model="option.unicode" v-if="option.regular"
              >处理 Unicode 编码（如 emoji、特殊字符）</el-checkbox
            >
          </el-form-item>
          <el-form-item v-if="option.filecontented">
            <el-input
              type="textarea"
              :placeholder="
                option.regular
                  ? '请注意转义符使用\\, 转义集合请看上方转义字符集'
                  : '暂不支持多个匹配，例如：edit,userinfo，匹配的则是edit,userinfo合并后的字符串'
              "
              v-model="option.filecontent"
              :autosize="{ minRows: 3, maxRows: 3 }"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="转义字符集"
      :visible.sync="zhuanyiShow"
      width="50%"
      top="0vh"
      :before-close="() => (zhuanyiShow = false)"
    >
      <el-descriptions :column="2">
        <el-descriptions-item label="\s"
          >匹配任意空白字符（含空格、Tab、换行）</el-descriptions-item
        >
        <el-descriptions-item label="\S"
          >匹配任意非空白字符</el-descriptions-item
        >
        <el-descriptions-item label="\t">制表符</el-descriptions-item>
        <el-descriptions-item label="\n">换行符</el-descriptions-item>
        <el-descriptions-item label="\r">回车符</el-descriptions-item>
        <el-descriptions-item label="\r\n"
          >Windows 换行（回车+换行）</el-descriptions-item
        >
        <el-descriptions-item label="\f">换页符</el-descriptions-item>
        <el-descriptions-item label="\v">垂直制表符</el-descriptions-item>
        <el-descriptions-item label="' '"
          >普通空格（直接写空格即可）</el-descriptions-item
        >
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterList: "",
      dialogVisible: false,
      zhuanyiShow: false,
      option: {
        fileed: true,
        filtered: false,
        appointed: false,
        filenamed: false,
        filecontented: false,
        regular: false,
        global: true,
        size: false,
        multiline: false,
        dotAll: false,
        unicode: false,
        filesnamed: false,
        filesname: "",
        file: "node_modules,uni_modules,unpackage,dist,catch,debug",
        filter: "",
        appoint: "",
        filename: "",
        filecontent: "",
      },
    };
  },
  watch: {
    "option.filtered"(n) {
      if (!n) {
        this.option.filter = "";
      }
    },
    "option.appointed"(n) {
      if (!n) {
        this.option.appoint = "";
      }
    },
    "option.filenamed"(n) {
      if (!n) {
        this.option.filename = "";
      }
    },
    "option.filesnamed"(n) {
      if (!n) {
        this.option.filesname = "";
      }
    },
    "option.filecontented"(n) {
      if (!n) {
        this.option.filecontent = "";
        this.option.regular = false;
        this.option.global = true;
        this.option.size = false;
        this.option.multiline = false;
        this.option.dotAll = false;
        this.option.unicode = false;
      }
    },
  },
  methods: {
    handleClose() {
      if (this.option.filtered && !this.option.filter) {
        this.option.filtered = false;
      }
      if (this.option.appointed && !this.option.appoint) {
        this.option.appointed = false;
      }
      if (this.option.filenamed && !this.option.filename) {
        this.option.filenamed = false;
      }
      if (this.option.filecontented && !this.option.filecontent) {
        this.option.filecontented = false;
      }
      this.dialogVisible = false;
    },
    handleConfirm() {
      if (!this.option.file) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入过滤文件夹`,
        });
      }
      if (this.option.filtered && !this.option.filter) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入过滤后缀`,
        });
      }
      if (this.option.appointed && !this.option.appoint) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入指定后缀`,
        });
      }
      if (this.option.appointed && !this.option.appoint) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入指定后缀`,
        });
      }
      if (this.option.filesnamed && !this.option.filesname) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入文件夹名称`,
        });
      }
      if (this.option.filenamed && !this.option.filename) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入文件名`,
        });
      }
      if (this.option.filecontented && !this.option.filecontent) {
        return this.$notify({
          type: "warning",
          title: "操作提醒",
          message: `请输入文件查找内容`,
        });
      }
      this.$emit("filter", this.option);
    },
    show() {
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
  max-height: 70vh;
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

::v-deep .el-dialog {
  // background-image: url("../../assets/images/R.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>