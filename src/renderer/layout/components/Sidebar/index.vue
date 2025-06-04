<template>
    <div class="logo_bar" :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
        <div class='nav-list' v-if='isLive'>
            <div class='nav-item' @click="handlePush" v-for="(route, index) in sidebarRouters.filter(e => !e.hidden)" :key="route.path  + index">
                <svg-icon v-if="route.meta&&route.meta.icon" :icon-class="route.meta.icon"/>
                {{ route.meta.title }}
            </div>
        </div>
        <el-scrollbar v-else :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
                :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
                @select='handleSelect'
            >
                <sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path  + index" :item="route" :base-path="route.path" style="padding: 0 10px;" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
    data() {
        return {
            activePath: ''
        }
    },
    computed: {
        isLive() {
            return this.$store.getters.isLive
        },
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            if(this.isLive) {
                return '/live/livefangan'
            }

            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }

            if(this.activePath) {
                return this.activePath
            }

            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    methods: {
        handlePush() {
            this.$message({
                message: '请先关闭直播',
                type: 'error'
            })
        },
        handleSelect() {
            this.activePath = null
        },
        handleGetPath(event, path) {
            this.activePath = path
        }
    },
    created() {
        this.$ipcRenderer.on('active-menu-result', this.handleGetPath)
    },
    beforeDestroy() {
        this.$ipcRenderer.off('active-menu-result', this.handleGetPath)
    }
};
</script>
<style lang='scss' scoped>
::v-deep .route-nolive {
    .scrollbar-wrapper {
        margin-right: 0 !important;    
    }   

    .el-menu-item.is-active.submenu-title-noDropdown {
        border-radius: 5px;
        color: #fff !important;
        background-color: #015ce6 !important;
        display: flex;
        align-items: center;
        
        svg {
            font-size: 20px !important;
        }
    }

    .el-menu-item.submenu-title-noDropdown {
        color: #8b9ab4 !important;
        border-radius: 5px;
        background-color: #f2f7fe !important;
        display: flex;
        align-items: center;

        svg {
            font-size: 20px !important;
        }
    }

    .el-menu-item {
        padding-left: 20px !important;
        margin: 5px 0;
    }
}

::v-deep .el-menu--collapse.el-menu .route-live .nolive {
    .scrollbar-wrapper {
        margin-right: 0 !important;    
    }   

    .el-menu-item {
        color: #8b9ab4 !important;
        border-radius: 5px;
        background-color: #f2f7fe !important;
        display: flex;
        align-items: center;

        svg {
            font-size: 20px !important;
        }
    }

    .el-menu-item {
        padding-left: 20px !important;
        margin: 5px 0;
    }
}

::v-deep .el-menu--collapse.el-menu .route-live .live {
    .scrollbar-wrapper {
        margin-right: 0 !important;    
    }   

    .el-menu-item {
        color: #fff !important;
        border-radius: 5px;
        background-color: #015ce6 !important;
        display: flex;
        align-items: center;

        svg {
            font-size: 20px !important;
        }
    }

    .el-menu-item {
        padding-left: 20px !important;
        margin: 5px 0;
    }
}

* {
  user-select: none;
}
</style>


<style lang="scss" scoped>
    .nav-list {
        width: 100%;
        color:#8b9ab4;
        font-size: 14px;
        padding: 0 10px;

        .nav-item {
            height: 56px;
            padding: 0 20px;
            background: #f2f7fe;
            margin: 10px 0;
            line-height: 56px;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;

            &:first-child {
                margin-top: 5px;
            }

            &:last-child {
                color: #fff;
                background: #015ce6;
            }

            svg {
                margin-right: 5px !important;
                font-size: 20px !important;
            }
        }
    }
</style>