<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/> -->
    <!-- <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/> -->

    <div class="title">文件管理</div>
    <drag></drag>
    <div class="r">
      <div :class="{ live: isLive }" @click="handlePush"></div>
      <div class="right-menu">
        <!-- <template>
          <search id="header-search" class="right-menu-item" />
          <el-tooltip content="布局大小" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>
        </template> -->

        <!-- <div class="avatar-wrapper">
          <img :src="userInfo.login_img" @click="handleCenter" class="user-avatar" width="40px" height="40px" style="border-radius: 10px;cursor: pointer;" />
        </div> -->
        <!-- <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="setting = true">
              <span>布局设置</span>
            </el-dropdown-item>
            <a target="_blank" href="https://github.com/">
              <el-dropdown-item>源码</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/">
              <el-dropdown-item>文档</el-dropdown-item>
            </a>

            <el-dropdown-item divided @click.native="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>

      <div class="controls">
        <i class="el-icon-minus jian" @click="handleScale"></i>
        <!-- <i class="el-icon-full-screen jian" @click="handleScreen"></i> -->
        <i class="el-icon-close quit" @click="handleQuit"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import drag from "./drag";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    SizeSelect,
    Search,
    drag,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "userInfo", "logoName"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
    isLive() {
      return this.$store.getters.isLive;
    },
  },
  methods: {
    handleCenter() {
      this.setSideBar("Setting");
      this.$router.push({ name: "Setting" });
    },
    handlePush() {
      this.$message({
        message: "请先关闭直播",
        type: "error",
      });
    },
    handleScale() {
      this.$ipcRenderer.send("window-min");
    },
    handleScreen() {
      this.$ipcRenderer.send("window-max");
    },
    handleQuit() {
      this.$confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ipcRenderer.send("close-app");
        })
        .catch(() => {});
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.live {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}

.title {
  height: 100%;
  line-height: 50px;
  padding-left: 14px;
  font-size: 18px;
}

.avatar-wrapper > .user-avatar {
  // box-shadow: 0 0 5px #000 inset;
}

@import "~@/assets/styles/variables.scss";
.navbar {
  // 20220413 新增 sidebarL
  // margin-left: $base-sidebar-l-width;
  width: 100%;
  position: fixed;
  z-index: 1002;
  height: 50px;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        box-shadow: 0 0 5px #000;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.r {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.controls {
  padding: 0 20px;

  .jian,
  .quit {
    cursor: pointer;
    padding: 6px;
    display: inline-block;
    margin-left: 5px;
    transition: 0.1s;

    &:hover {
      color: #000;
      background: #cccccc50;
    }
  }
}

* {
  user-select: none;
}
</style>