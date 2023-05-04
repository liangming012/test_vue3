<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="store.dashboardMiniDrawer" v-model="store.dashboardShowDrawer" fixed app>
      <v-container column fill-height>
        <v-list>
          <v-subheader>Main menu</v-subheader>
          <v-list-tile to="/main/dashboard">
            <v-list-tile-action>
              <v-icon>web</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/profile/view">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/profile/edit">
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Edit Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/profile/password">
            <v-list-tile-action>
              <v-icon>vpn_key</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Change Password</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader v-show="store.hasAdminAccess">
          <v-subheader>Admin</v-subheader>
          <v-list-tile to="/main/admin/users/all">
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Manage Users</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/admin/users/create">
            <v-list-tile-action>
              <v-icon>person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Create User</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-spacer></v-spacer>
        <v-list>
          <v-list-tile @click="store.actionUserLogOut">
            <v-list-tile-action>
              <v-icon>close</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="switchMiniDrawer">
            <v-list-tile-action>
              <v-icon v-html="store.dashboardMiniDrawer ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Collapse</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-toolbar dark color="primary" app>
      <v-toolbar-side-icon @click.stop="store.dashboardShowDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="appName"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left offset-y>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to="/main/profile">
            <v-list-tile-content>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="store.actionUserLogOut">
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>close</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-3" fixed app>
      <v-spacer></v-spacer>
      <span>&copy; {{appName}}</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { appName } from '../../env';
import {useMainStore} from "../../store/main-store";

const store = useMainStore();
const switchMiniDrawer = () => {
  store.dashboardMiniDrawer = ! store.dashboardMiniDrawer;
}

</script>
