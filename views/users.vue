<template lang="html">
    <div>
        <h1>Users in Database</h1>
        <users :users="users"></users>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
        }
    },
    computed: {
      loginToggle: function(){
        return (this.loggedStatus) ? 'Logout' : 'Login';
      }
    }
}
</script>

<style lang="css">
</style>
