<style>
</style>

<template>
<div>
  <admin-user-modal></admin-user-modal>
  <table class="stack" id="users-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Level</th>
        <th>Last Login</th>
        <th v-show="canDelete">Active</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <!--<td><a :href="'user/' + user.google.name + '/edit'">{{user.google.name}}</a></td>-->
        <td><span @click="showModal = true">{{user.google.name}}</span></td>
        <td>{{user.google.email}}</td>
        <td></td>
        <td></td>
        <td v-show="canDelete">
          <input type="checkbox" v-model="is_active" @click="toggleActive(user._id)" />
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  import axios from 'axios'
  import AdminUserModal from './admin_UserModal.vue'
  export default {
    name: 'AdminUsersTable',
    data: () => ({
      is_active: false,
      showModal: true,
      three: 3
    }),
    props: ['users', 'canDelete'],
    mounted() {

    },
    components: {
      AdminUserModal,
    },
    methods: {
      // Toggles a user's status from (in)active to (in)active
      toggleActive(userId){
        axios.post('/api/user/deactivate', { userId: userId })
          .then((response) => {
            console.log(response)
            this.is_active === true ? this.is_active = false : this.is_active = true
          })
      }
    }
  }
</script>
