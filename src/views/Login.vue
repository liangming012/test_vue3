<template>
  <v-app style="height:100%">
    <v-main>
      <v-container fill-height>
        <v-row no-gutters>
            <v-col>
            <v-card>
              <v-toolbar border density="compact" v-bind:title="appName"></v-toolbar>
              <v-card-text>
                <v-form @keyup.enter="submit">
                  <v-text-field @keyup.enter="submit" v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field @keyup.enter="submit" v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
                <div v-if="store.logInError">
                  <v-alert :value="store.logInError" transition="fade-transition" type="error">
                    Incorrect email or password
                  </v-alert>
                </div>
                <v-container class="caption text-xs-right"><router-link to="/recover-password">Forgot your password?</router-link></v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="" @click.prevent="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { appName } from '../env';
import {useMainStore} from "../store/main-store";
let email = '';
let password = '';
const store = useMainStore();
const submit =()=> {
  store.actionLogIn({username: email, password: password});
}

</script>

<style>
</style>
