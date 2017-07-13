<style>
</style>

<template>
  <div class="row">
    <div class="small-12 columns">
      <Admin-Users-Table :users='users' :canDelete='canDelete'></Admin-Users-Table>
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
            this.canDelete = response.data
          })
      }
    }
  };
</script>
