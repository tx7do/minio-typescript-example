<template>
  <form ref="formRef" @submit="onSubmit">
    <label>
      {{ props.title }}:
    </label>
    <label>
      Select upload file:
      <input type="file" id="file" ref="inputRef"/>
    </label>
    <button type="submit">Upload</button>
  </form>
</template>

<script lang="ts" setup>
import { unref, ref } from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const formRef = ref<HTMLFormElement | null>(null);

const emit = defineEmits(['click-upload']);

const props = defineProps({
  title: {
    type: String,
    default: '',
  }
});

function onSubmit(e: Event) {
  e.preventDefault();

  const inputRefDom = unref(inputRef);
  const file = inputRefDom?.files?.[0];
  emit('click-upload', file);
}
</script>

<style scoped>
</style>
