<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";

const router = useRouter();
const route = useRoute();
const activeKey = route.params.categoryxzx;
const postList = ref([]);
myAxios.post("/post/list/page/vo", {}).then((res: any) => {
  postList.value = res.records;
});

const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};
const searchParams = ref(initSearchParams);
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
  } as any;
});
const onSearch = () => {
  router.push({
    query: searchParams.value,
  });
};
const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="请输入搜索内容"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章列表">
        <PostList :postList="postList"></PostList>
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户" force-render @change="onTabChange">
        <UserList></UserList>
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" @change="onTabChange">
        <PictureList></PictureList>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
