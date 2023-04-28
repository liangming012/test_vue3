import { defineStore } from 'pinia'
import {AppNotification, MainState} from "../interfaces/index";
import {api} from "../api";
import {getLocalToken, removeLocalToken, saveLocalToken} from "../utils";
import router from "../router";
import {AxiosError} from "axios";


export const useMainStore = defineStore('main', {
  // 其他配置...
  state:():MainState =>({
    isLoggedIn: null,
    token: '',
    logInError: false,
    userProfile: null,
    dashboardMiniDrawer: false,
    dashboardShowDrawer: true,
    notifications: [],
  }),
  getters: {
    hasAdminAccess: (state: MainState) => {
      return (
          state.userProfile &&
          state.userProfile.is_superuser && state.userProfile.is_active);
    },
    firstNotification: (state: MainState) => state.notifications.length > 0 && state.notifications[0]
  },
  actions: {
    async actionLogIn(payload: { username: string; password: string }) {
      try {
        const response = await api.logInGetToken(payload.username, payload.password);
        const token = response.data.access_token;
        if (token) {
          saveLocalToken(token);
          this.token = token;
          this.isLoggedIn = true;
          this.logInError = false;
          await this.actionGetUserProfile();
          await this.actionRouteLoggedIn();
          this.notifications.push({ content: 'Logged in', color: 'success' });
        } else {
          await this.actionLogOut();
        }
      } catch (err) {
        this.logInError = true;
        await this.actionLogOut();
      }
    },
    async actionGetUserProfile() {
      try {
        const response = await api.getMe(this.token);
        if (response.data) {
          this.userProfile = response.data;
        }
      } catch (error) {
        await this.actionCheckApiError(error);
      }
    },
    async actionUpdateUserProfile(payload) {
      try {
        const loadingNotification = { content: 'saving', showProgress: true };
        this.notifications.push(loadingNotification);
        const response = (await Promise.all([
          api.updateMe(this.token, payload),
          await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
        ]))[0];
        this.userProfile = response.data;
        this.notifications = this.notifications.filter((notification) => notification !== loadingNotification);
        this.notifications.push({ content: 'Profile successfully updated', color: 'success' });
      } catch (error) {
        await this.actionCheckApiError(error);
      }
    },
    async actionCheckLoggedIn() {
      if (!this.isLoggedIn) {
        let token = this.token;
        if (!token) {
          const localToken = getLocalToken();
          if (localToken) {
            this.token = localToken;
            token = localToken;
          }
        }
        if (token) {
          try {
            const response = await api.getMe(token);
            this.isLoggedIn = true;
            this.userProfile = response.data;
          } catch (error) {
            await this.actionRemoveLogIn();
          }
        } else {
          await this.actionRemoveLogIn();
        }
      }
    },
    async actionRemoveLogIn() {
      removeLocalToken();
      this.token = '';
      this.isLoggedIn = false;
    },
    async actionLogOut() {
      await this.actionRemoveLogIn();
      await this.actionRouteLogOut();
    },
    async actionUserLogOut() {
      await this.actionLogOut();
      this.notifications.push({ content: 'Logged out', color: 'success' });
    },
    actionRouteLogOut() {
      if (router.currentRoute.path !== '/login') {
        router.push('/login');
      }
    },
    async actionCheckApiError(payload: AxiosError) {
      if (payload.response!.status === 401) {
        await this.actionLogOut();
      }
    },
    actionRouteLoggedIn() {
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/') {
        router.push('/main');
      }
    },
    async removeNotification(payload: { notification: AppNotification, timeout: number }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.notifications = this.notifications.filter((notification) => notification !== payload.notification);
          resolve(true);
        }, payload.timeout);
      });
    },
    async passwordRecovery(payload: { username: string }) {
      const loadingNotification = { content: 'Sending password recovery email', showProgress: true };
      try {
        this.notifications.push(loadingNotification);
        const response = (await Promise.all([
          api.passwordRecovery(payload.username),
          await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
        ]))[0];
        this.notifications = this.notifications.filter((notification) => notification !== loadingNotification);
        this.notifications.push({ content: 'Password recovery email sent', color: 'success' });
        await this.actionLogOut();
      } catch (error) {
        this.notifications = this.notifications.filter((notification) => notification !== loadingNotification);
        this.notifications.push({ color: 'error', content: 'Incorrect username' });
      }
    },
    async resetPassword(payload: { password: string, token: string }) {
      const loadingNotification = { content: 'Resetting password', showProgress: true };
      try {
        this.notifications.push(loadingNotification);
        const response = (await Promise.all([
          api.resetPassword(payload.password, payload.token),
          await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
        ]))[0];
        this.notifications = this.notifications.filter((notification) => notification !== loadingNotification);
        this.notifications.push({ content: 'Password successfully reset', color: 'success' });
        await this.actionLogOut();
      } catch (error) {
        this.notifications = this.notifications.filter((notification) => notification !== loadingNotification);
        this.notifications.push({ color: 'error', content: 'Error resetting password' });
      }
    },
  },
})
