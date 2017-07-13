import Vue from 'vue';
import AdminUsersTableContainer from './vueComponents/admin_UsersTableContainer.vue';

new Vue({
  el: '#app-container',
  render(createElement) {
    return createElement(AdminUsersTableContainer);
  },
});
