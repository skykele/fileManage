<template>
  <el-dialog
      :modal='false'
      :show-close='false'
      :append-to-body='true'
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :visible="show"
    >
      <table class='upload_list' border='0'>
        <tr
          class='upload_list_row'
          v-for='(item,index) in data'
          :key="index"
        >
          <td class='upload_list_label'>
            <el-tooltip class="item" effect="dark" :content="item.fileName" placement="top-start">
              <span>{{item.fileName}}</span>
            </el-tooltip>
          </td>
          <td class='upload_list_content'>
            <div>
              <el-progress
                style="width:100%"
                :percentage="item.progress"
              ></el-progress>
              <i
                class='el-icon-refresh-right'
                v-if='item.error'
                @click='handleesetUpload(item)'
              ></i>
            </div>
          </td>
        </tr>
      </table>
    </el-dialog>
</template>

<script>
export default {
    props: {
        data: Array,
        show: Boolean,
    },
    watch: {
        data: {
            deep: true,
            handler(n) {
                if(n.length === 0 || this.data.length === 0) return
                const len = n.filter(e => e.progress === 100).length
                if(len === this.data.length) {
                    this.$message({
                        message: '下载完成',
                        type: 'success',
                        duration: 1500
                    })
                    setTimeout(() => {
                        this.$emit('handleDone')
                    }, 1500)
                }
            }
        }    
    },
    methods: {
        handleesetUpload() {
            this.$emit('tryAgain', item)
        }
    }
}
</script>

<style lang='scss' scoped>

::v-deep {
  .el-dialog__header { 
    padding: 0;
  }
}

.upload_list{
  width: 100%;
  table-layout:fixed;
  .upload_list_row{
    width: 100%;
    display: flex;
    td{
      font-weight: 400;
      line-height: 1.5;
      padding: 6px 10px;
      box-sizing: border-box;
      border: 1px solid #ebeef5;
    }
    .upload_list_label{
      width: 40%;
      font-size: 14px;
      color: #909399;
      background: #FAFAFA;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .upload_list_content{
      flex: 1;
      >div{
        display: flex;
        flex-wrap: nowrap;
      }
    }
  }
}

.el-dialog {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
</style>