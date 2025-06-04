<template>
	<!-- <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }"> -->
	<div :class="{'has-logo':showLogo}" style="background-color: #fff;">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div :class='{ "live": isLive }' @click="handlePush"></div>
    <!-- <div style="width: 100%;height: 20px;font-size: 16px;color: red">fqwgwq</div> -->
		<el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
			<!-- <el-menu
					:default-active="activeMenu"
					:background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
					:text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
					:unique-opened="true"
					:active-text-color="settings.theme"
					mode="vertical"  @select="handleSelect">
				<el-menu-item v-for="(route, index) in topMenus" :key="route.path  + index" :index="route.path" >
          <svg-icon style="width:2em;height:2em;" v-if="route.meta&&route.meta.icon"  :icon-class="route.meta.icon"/>
          <svg-icon v-else style="width:2em;height:2em;" :icon-class="route.children[0].meta.icon"/>
        </el-menu-item>
			</el-menu> -->
      <el-menu
        style="padding: 0 5px;"
        :default-active="activeMenu"
        background-color="#f1f5f9"
        :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        active-text-color="#4577FC"
        mode="vertical"  @select="handleSelect"
      >
				<el-menu-item class="item_bar" v-for="(route, index) in topMenus" :key="route.path  + index" :index="route.path">
          <img style="width: 60px;height: 60px;" :src="route.meta.image" alt="" srcset="">
          <div v-if="route.meta&&route.meta.title" >{{ route.meta.title}}</div>
        </el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Logo from "./Logo";
import variables from "@/assets/styles/variables.scss";
import { constantRoutes } from "@/router";
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile'];
export default {
  data() {
    return {
      // 当前激活菜单的 index
      currentIndex: undefined
    }
  },
  components: { Logo },
  computed: {
		...mapState(["settings"]),
		showLogo() {
			return this.$store.state.settings.sidebarLogo;
		},
    isLive() {
      return this.$store.getters.isLive
    },
		variables() {
			return variables;
		},
		isCollapse() {
			return true;
		}
    // 顶部显示菜单
    ,topMenus() {
      let topMenus = [];
      this.routers.map((menu) => {
        if (menu.hidden !== true) {
          // 兼容顶部栏一级菜单内部跳转
          if (menu.path === "/") {
              topMenus.push(menu.children[0]);
          } else {
              topMenus.push(menu);
          }
        }
      })
      return topMenus;
    },
    // 所有的路由信息
    routers() {
      return this.$store.state.permission.topbarRouters;
    },
    // 设置子路由
    childrenMenus() {
      var childrenMenus = [];
      this.routers.map((router) => {
        for (var item in router.children) {
          if (router.children[item].parentPath === undefined) {
            if(router.path === "/") {
              router.children[item].path = "/" + router.children[item].path;
            } else {
              if(!this.ishttp(router.children[item].path)) {
                router.children[item].path = router.path + "/" + router.children[item].path;
              }
            }
            router.children[item].parentPath = router.path;
          }
          childrenMenus.push(router.children[item]);
        }
      });
      return constantRoutes.concat(childrenMenus);
    },
    // 默认激活的菜单
    activeMenu() {
      const path = this.$route.path;
      let activePath = path;
      if (path !== undefined && path.lastIndexOf("/") > 0 && hideList.indexOf(path) === -1) {
        const tmpPath = path.substring(1, path.length);
        activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
        this.$store.dispatch('app/toggleSideBarHide', false);
      } else if(!this.$route.children) {
        activePath = path;
        // this.$store.dispatch('app/toggleSideBarHide', true);
      }
      // this.activeRoutes(activePath);
      return activePath;
    }

    },
  methods: {
    handlePush() {
      this.$message({
        message: '请先关闭直播',
        type: 'error'
      })
    },
    // 菜单选择事件
    async handleSelect(key, keyPath) {
      await this.$ipcRenderer.invoke('active-menu', '')
      this.currentIndex = key;
      const route = this.routers.find(item => item.path === key);
      this.$store.dispatch('changeShowSidebar', false)
      if (this.ishttp(key)) {
        // http(s):// 路径新窗口打开
        window.open(key, "_blank");
      } else if(route.children.length === 1) {
        this.activeRoutes(key);
        this.$store.dispatch('changeShowSidebar', false)
        const name = route.children[0].name
        this.$router.push({ name })
      }  else if(route.children.length > 1) {
        this.activeRoutes(key);
        this.$store.dispatch('changeShowSidebar', true)
        const name = route.children[0].name
        this.$router.push({ name })
      } else if (!route || !route.children) {
        // 没有子路由路径内部打开
        this.$router.push({ path: key });
        // this.$store.dispatch('app/toggleSideBarHide', true);
      } else {
        // 显示左侧联动菜单
        this.activeRoutes(key);
        this.$store.dispatch('changeShowSidebar', true)
        this.$store.dispatch('app/toggleSideBarHide', false);
      }
    },
    // 当前激活的路由
    activeRoutes(key) {
      var routes = [];
      if (this.childrenMenus && this.childrenMenus.length > 0) {
        this.childrenMenus.map((item) => {
          if (key == item.parentPath || (key == "index" && "" == item.path)) {
            routes.push(item);
          }
        });
      }
      if(routes.length > 0) {
        this.$store.commit("SET_SIDEBAR_ROUTERS", routes);
      }
    },
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    }
  }
};
</script>

<style lang='scss' scoped>
.item_bar{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: normal;
  margin-bottom: 20px;
  height: 86px;
  padding-top: 5px;
}

* {
  user-select: none;
}

.live {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;  
  z-index: 999;
}
</style>