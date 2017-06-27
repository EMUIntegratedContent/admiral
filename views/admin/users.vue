<template lang="html">
  <div class="">
    <h1>{{title}}</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Email (username)</th>
          <th>Name</th>
          <th>Level</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{ user.google.email }}</td>
          <td>{{ user.google.name }}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
    }
  },
  mounted: function() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers(){
      // GET /someUrl
      this.$http.get('/api/users').then(response => {
        // Set users
        this.users = response.body

      }, response => {
        // error callback
        console.log("NAH!")
      });
      console.log("--FETCHED ALL USERS--")
    }
  }
}
</script>

<style lang="css">

</style>
