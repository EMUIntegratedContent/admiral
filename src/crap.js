import Vue from 'vue/dist/vue.js';
import AdminUserInfo from './vueComponents/admin_UserInfo.vue';

new Vue({
  el: '#user-container',
  render(createElement) {
    return createElement(AdminUserInfo);
  }
});
