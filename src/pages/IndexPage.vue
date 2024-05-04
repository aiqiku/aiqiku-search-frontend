<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";
import { Post, User } from "@/types";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;
const postList = ref<Array<Post>>([]);
const userList = ref<Array<User>>([]);
const pictureList = ref([]);
const initSearchParams = {
  text: "",
  type: "post",
  pageSize: 10,
  pageNum: 1,
};
const searchParams = ref(initSearchParams);
const searchText = ref(route.query.text);
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
  const { searchText } = params;
  console.log(searchText);
  myAxios.post("/search/all", params).then((res: any) => {
    postList.value = res.postVOList;
    userList.value = res.userVOList;
    pictureList.value = res.pictureList;
  });
};
const loadSingleData = (params: any) => {
  console.log(params);
  const { type } = params;
  if (!type) {
    message.error("搜索类别为空!");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/search/all", query).then((res: any) => {
    if (type === "post") {
      postList.value = res.postVOList;
      return;
    } else if (type === "user") {
      userList.value = res.userVOList;
      return;
    } else if (type === "picture") {
      pictureList.value = res.pictureList;
      return;
    }
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

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    type: route.params.category,
  } as any;
  console.log(searchParams.value.text);
  console.log(searchParams.value.type);
  loadSingleData(searchParams.value);
});
const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  });
  loadAllData(searchParams.value);
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
      v-model:value="searchText"
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
