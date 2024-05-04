<script setup lang="ts">
import { User } from "@/types";
import { withDefaults } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

interface Pros {
  userList?: User[];
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Pros>(), {
  userList: () => [],
});
</script>
<template>
  <a-list
    item-layout="horizontal"
    :data-source="props.userList ? props.userList : []"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.userProfile">
          <template #avatar>
            <a-avatar
              v-if="item.userAvatar != null && item.userAvatar != ''"
              :src="item.userAvatar"
            />
            <a-avatar v-if="item.userAvatar == null || item.userAvatar == ''">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </template>
          <template #title>
            <a>{{ item.userName }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped></style>
