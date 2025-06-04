<template>
  <div>
    <el-dialog :title="title || '详情'" :visible.sync="videoShow" width="600px">
      <div style="display: flex; justify-content: center; height: 100%">
        <div
          v-show="video_url"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          style="
            display: flex;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100%;
          "
        >
          <video
            style="height: 100%"
            :src="video_url"
            @play="onPlay"
            @pause="onPause"
            preload
          >
            <source :src="video_url" type="video/mp4">
            <source :src="video_url" type="video/avi">
          </video>
          <div
            v-show="!playing"
            @click="togglePlay"
            style="font-size: 50px; position: absolute; top: 43%; left: 43%"
          >
            <i class="el-icon-video-play"></i>
          </div>
          <div
            v-show="playing && is_show"
            @click="togglePlay"
            style="font-size: 50px; position: absolute; top: 43%; left: 43%"
          >
            <i class="el-icon-video-pause"></i>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  props: ["video_url", "title"],
  data() {
    return {
      playing: false,
      is_show: true,
      videoShow: false,
    };
  },
  watch: {
    videoShow(n, o) {
      if (!n) {
        this.togglePlay();
      }
    },
  },
  methods: {
    showVideo() {
      this.videoShow = true;
      const video = this.$el.querySelector("video");
      video && (video.currentTime = 0)
    },
    handleMouseEnter() {
      this.is_show = true;
    },
    handleMouseLeave() {
      this.is_show = false;
    },
    togglePlay() {
      this.playing = !this.playing;
      if (!this.videoShow) {
        this.playing = false;
      }
      const video = this.$el.querySelector("video");
      if (this.playing) {
        video.play();
      } else {
        video.pause();
      }
    },
    onPlay() {
      this.playing = true;
    },
    onPause() {
      this.playing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__title {
  display: block;
  white-space: nowrap;
  max-width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
}

::v-deep .el-dialog__body {
  padding: 20px !important;
  height: calc(88vh - 54px);
}

::v-deep .el-dialog {
  height: 88vh !important;
}
</style>