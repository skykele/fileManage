import mixins from './showSideBar'

const MyMixinsPlugin = {
    install(Vue) {
        Vue.mixin(mixins)
    }
}

export default MyMixinsPlugin