<template>
  <div v-if='isLive' @click="handlePush" :class='to === "/live/livefangan" ? "live" : "nolive"'><slot /></div>
  <div class='nolive' v-else>
    <component :is="type" v-bind="linkProps(to)">
      <slot />
    </component>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    isLive() {
      return this.$store.getters.isLive
    },
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    handlePush() {
      this.$message({
        message: '请先关闭直播',
        type: 'error'
      })
    },
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
