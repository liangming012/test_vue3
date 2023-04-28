<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useMainStore } from '../../store/main-store'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

const store = useMainStore();
const startRouteGuard = async (to, from, next) => {
  await store.actionCheckLoggedIn();
  if (store.isLoggedIn) {
    if (to.path === '/login' || to.path === '/') {
      next('/main');
    } else {
      next();
    }
  } else if (store.isLoggedIn === false) {
    if (to.path === '/' || (to.path as string).startsWith('/main')) {
      next('/login');
    } else {
      next();
    }
  }
};
onBeforeRouteLeave((to, from, next) => {
  startRouteGuard(to, from, next);
});
onBeforeRouteUpdate((to, from, next) => {
  startRouteGuard(to, from, next);
});

</script>
