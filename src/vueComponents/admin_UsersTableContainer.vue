<style>
</style>

<template>
  <div class="row">
    <div class="small-12 columns">
      <admin-users-table :users='users' :can-delete='canDelete'></admin-users-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import AdminUsersTable from './admin_UsersTable.vue'
  export default {
    name: 'AdminUsersTableContainer',
    data: () => ({
      users: {},
      canDelete: false
    }),
    mounted() {
      this.fetchUsers()
      this.hasRole('delete')
    },
    components: {
      AdminUsersTable,
    },
    methods: {
      /**
       * Fetch all system users from the API
       */
      fetchUsers(){
        axios.get('/api/user/all')
          .then( ({ data: users }) => {
            this.users = users
          })
      },

      /**
       * Determine if the user has a given permission
       */
      hasRole(role){
        axios.post('/api/admin/hasRole', { role: role })
          .then( (response) => {
            this.can_delete = response.data
          })
      }
    }
  };
</script>
