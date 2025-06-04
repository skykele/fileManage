<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { constantRoutes } from '@/router'
export default  {
  name:  'App',
  metaInfo() {
    return {
      title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
      titleTemplate: title => {
          return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
      }
    }
  },
  created() {
    this.setSideBar()
  },
  methods: { 
    setSideBar() {
      // const route = this.$route?.hidden
      // console.log(route);
      // if(hidden !== undefined && !route) {
      //   this.$store.dispatch('changeShowSidebar', true)
      //   return
      // }
      const newRoutes = constantRoutes.filter(e => !e.hidden)
      if(newRoutes && newRoutes.length && newRoutes[0].children && newRoutes[0].children.length === 1) {
        this.$store.dispatch('changeShowSidebar', false)
      } else {
        this.$store.dispatch('changeShowSidebar', true)
      }
    }
  }
}
</script>