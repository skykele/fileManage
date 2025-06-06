import { Dialog, Drawer } from "element-ui";

const DialogPathed = {
    extends: Dialog,
    data() {
        return {
            wrapperMouseDowned: false
        }
    },
    mounted() {
        this.$el.onmousedown = (e) => {
            this.wrapperMouseDowned = e.target.classList.contains('el-dialog__wrapper')
        }
    },
    methods: {
        handleWrapperClick: function handleWrapperClick() {
            if (!this.closeOnClickModal || !this.wrapperMouseDowned) return
            this.handleClose();
        }
    }
}

const DrawerPathed = {
    extends: Drawer,
    data() {
        return {
            wrapperMouseDowned: false
        }
    },
    mounted() {
        this.$el.onmousedown = (e) => {
            this.wrapperMouseDowned = e.target.classList.contains('el-drawer__container')
        }
    },
    methods: {
        handleWrapperClick: function handleWrapperClick() {
            if (this.wrapperClosable && this.wrapperMouseDowned) return
            this.handleClose();
        }
    }
}

export default {
    install(Vue) {
        Vue.component(Dialog.name, DialogPathed)
        Vue.component(Drawer.name, DrawerPathed)
    }
}