<template lang="html">
  <div class="">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  data: function() {
        return {
        }
  },
  mounted: function() {
    this.loadInactives()
  },
  methods: {
    loadInactives(){
      console.log("INACTIVE USERS!")
    }
  }
}
</script>

<style lang="css">

</style>
