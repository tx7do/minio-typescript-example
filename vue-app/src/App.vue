<template>
  <FileInput @click-upload="onXhrUploadFile"/>
  <FileInput @click-upload="onFetchUploadFile"/>
  <FileInput @click-upload="onAxiosUploadFile"/>
</template>

<script lang="ts" setup>
import FileInput from './components/FileInput.vue';
import axios from 'axios';

function retrieveNewURL(file: File, cb: (file: File, url: string) => void) {
  const url = `http://localhost:8080/presignedUrl/${file.name}`;
  axios.get(url)
    .then(function (response) {
      cb(file, response.data.data.url);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function xhrUploadFile(file: File, url: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url, true);
  xhr.send(file);

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(`${file.name} 上传成功`);
    } else {
      console.error(`${file.name} 上传失败`);
    }
  };
}

function fetchUploadFile(file: File, url: string) {
  fetch(url, {
    method: 'PUT',
    body: file,
  })
    .then((response) => {
      console.log(`${file.name} 上传成功`, response);
    })
    .catch((error) => {
      console.error(`${file.name} 上传失败`, error);
    });
}

function axiosUploadFile(file: File, url: string) {
  axios
    .put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
    .then(function (response) {
      console.log(`${file.name} 上传成功`, response);
    })
    .catch(function (error) {
      console.error(`${file.name} 上传失败`, error);
    });
}

function onXhrUploadFile(file?: File) {
  console.log('onXhrUploadFile', file);
  if (file) {
    retrieveNewURL(file, (file, url) => {
      xhrUploadFile(file, url);
    });
  }
}

function onFetchUploadFile(file?: File) {
  console.log('onFetchUploadFile', file);
  if (file) {
    retrieveNewURL(file, (file, url) => {
      fetchUploadFile(file, url);
    });
  }
}

function onAxiosUploadFile(file?: File) {
  console.log('onAxiosUploadFile', file);
  if (file) {
    retrieveNewURL(file, (file, url) => {
      axiosUploadFile(file, url);
    });
  }
}

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
