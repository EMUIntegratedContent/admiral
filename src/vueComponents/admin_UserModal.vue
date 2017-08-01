<style>
</style>

<template>
  <div>
    <p>He says it used to be a farm before the motor law.</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AdminUserModal',
    data: () => ({

    }),
    props: [],
    mounted() {

    },
    components: {

    },
    methods: {
      // Toggles a user's status from (in)active to (in)active
      /*
      toggleActive(userId){
        axios.post('/api/user/deactivate', { userId: userId })
          .then((response) => {
            console.log(response)
            this.is_active === true ? this.is_active = false : this.is_active = true
          })
      }
      */
    }
  }
</script>
