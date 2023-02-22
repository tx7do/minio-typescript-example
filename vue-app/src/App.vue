<template>
  <FileInput title="XHR&nbsp;&nbsp;&nbsp;PUT" @click-upload="xhrPutFile"/>
  <FileInput title="Fetch PUT" @click-upload="fetchPutFile"/>
  <FileInput title="Axios PUT" @click-upload="axiosPutFile"/>
  <br/>
  <br/>
  <FileInput title="XHR&nbsp;&nbsp;&nbsp;POST" @click-upload="xhrPostFile"/>
  <FileInput title="Fetch POST" @click-upload="fetchPostFile"/>
  <FileInput title="Axios POST" @click-upload="axiosPostFile"/>
</template>

<script lang="ts" setup>
import FileInput from '@/components/FileInput.vue';
import { xhrPutFile, fetchPutFile, axiosPutFile } from '@/util/put_upload';
import { xhrPostFile, fetchPostFile, axiosPostFile } from '@/util/post_upload';
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
