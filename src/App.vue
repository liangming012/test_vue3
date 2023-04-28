<template>
  <div id="app">
  <router-view></router-view>
    <v-app>
      <v-main v-if="store.isLoggedIn===null">
        <v-container fill-height>
          <v-row >
            <v-col>
              <div class="text-xs-center">
                <div class="headline my-5">Loading...</div>
                <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <NotificationsManager></NotificationsManager>
    </v-app>
  </div>
</template>

<script lang="ts">
import {useMainStore} from './store/main-store';

export default {
  setup(){
    const store = useMainStore();
    return {store};
  }
}
</script>


<!--<script setup lang="ts">-->
<!--import {useMainStore} from './store/main-store'-->
<!--const store = useMainStore();-->

<!--</script>-->