<template>
    <div>
        <el-dialog
  title="试听"
  :visible.sync="videoShow"
  width="30%">
  <audio controls ref="audio" class="aud">
 
 <source :src="audio_url" />

</audio>
  
</el-dialog>
     
    </div>
  </template>
  
  <script>
  export default {
    props:['audio_url'],
    data() {
      return {
        videoShow:false
      }
    },
    methods: {
    
    }
  }
  </script>