<style>
</style>

<template>
  <div>
    <p><button class="button" data-open="exampleModal1">Click me for a modal</button></p>
    <div class="reveal" id="exampleModal1" data-reveal>
      <h1>Awesome. I Have It.</h1>
      <p class="lead">Your couch. It is mine.</p>
      <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
      <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
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
