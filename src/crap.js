import Vue from 'vue/dist/vue.js';
import AdminUserModal from './vueComponents/admin_UserModal.vue';

new Vue({
  el: '#user-container',
  render(createElement) {
    return createElement(AdminUserModal);
  }
});
