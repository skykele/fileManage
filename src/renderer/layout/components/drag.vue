<template>
  <div class="draggable" ref='draggable'></div>
</template>

<style scoped>
.draggable {
  flex: 1;
  width: 100%;
  background: transparent;
  height: 100%;
  -webkit-app-region: drag;
}
</style>