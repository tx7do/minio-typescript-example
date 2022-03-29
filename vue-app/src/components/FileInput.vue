<template>
  <form ref="formRef" @submit="onSubmit">
    <label>
      选择上传文件:
      <input type="file" id="file" ref="inputRef"/>
    </label>
    <button type="submit">上传</button>
  </form>
</template>

<script lang="ts" setup>
import { unref, ref } from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const formRef = ref<HTMLFormElement | null>(null);

const emit = defineEmits(['click-upload']);

function onSubmit(e: Event) {
  e.preventDefault();

  const inputRefDom = unref(inputRef);
  const file = inputRefDom?.files?.[0];
  emit('click-upload', file);
}
</script>

<style scoped>
</style>
