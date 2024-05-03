<script setup lang="ts">
import logo from "@/assets/logo.png";
import { withDefaults } from "vue";
import { Post } from "@/types";

interface Pros {
  postList: Post[];
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Pros>(), {
  postList: () => [],
});
</script>

<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="logo" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
