export default {
    computed: {
        parentShowBarRoutes() {
          return this.$store.getters.topbarRouters;
        },
    },
    methods: {
        // 判断是否有二级菜单
        verifyRoute(array, nameToFind, parent = null) {
            for (let i = 0; i < array.length; i++) {
                const item = array[i]
                if (item.name === nameToFind) {
                    return parent
                }
                if (item.children) {
                    const result = this.verifyRoute(item.children, nameToFind, item)
                    if (result) {
                        return result
                    }
                }
            }
            return null; // 没有找到匹配的项
        },
        // 判断是否显示二级菜单
        setSideBar(name) {
            const routes = this.verifyRoute(this.parentShowBarRoutes, name);
            if (routes && routes.children && routes.children.length > 1) {
                this.$store.commit("SET_SIDEBAR_ROUTERS", routes.children);
                this.$store.dispatch('changeShowSidebar', true)
            } else {
                this.$store.dispatch('changeShowSidebar', false)
            }
        }
    }
}
