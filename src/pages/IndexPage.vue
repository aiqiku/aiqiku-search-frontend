<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";
import { Post, User } from "@/types";

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;
const postList = ref<Array<Post>>([]);
const userList = ref<Array<User>>([]);
const pictureList = ref([]);
const initSearchParams = {
  searchText: "",
  pageSize: 10,
  pageNum: 1,
};
const loadAllDataOld = (params: any) => {
  let postQuery = {
    ...params,
    searchText: params.searchText,
  };
  searchPost(postQuery);
  let userQuery = {
    ...params,
    userName: params.searchText,
  };
  searchUser(userQuery);
  let pictureQuery = {
    ...params,
    searchText: params.searchText,
  };
  searchPicture(pictureQuery);
};
const loadAllData = (params: any) => {
  myAxios.post("/search/all", params).then((res: any) => {
    postList.value = res.postVOList;
    userList.value = res.userVOList;
    pictureList.value = res.pictureList;
  });
};

const searchPost = (params: any) => {
  myAxios.post("/post/list/page/vo", params).then((res: any) => {
    postList.value = res.records;
  });
};
const searchUser = (params: any) => {
  myAxios.post("/user/list/page/vo", params).then((res: any) => {
    userList.value = res.records;
  });
};
const searchPicture = (params: any) => {
  myAxios.post("/picture/list/page/vo", params).then((res: any) => {
    pictureList.value = res.records;
  });
};
const searchParams = ref(initSearchParams);
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    searchText: route.query.text,
  } as any;
});
const onSearch = () => {
  router.push({
    query: searchParams.value,
  });
  loadAllData(searchParams.value);
};
const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
//初始化数据
loadAllData(searchParams.value);
</script>
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.searchText"
      placeholder="请输入搜索内容"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :post-list="postList"></PostList>
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户" force-render @change="onTabChange">
        <UserList :user-list="userList"></UserList>
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" @change="onTabChange">
        <PictureList :picture-list="pictureList"></PictureList>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
