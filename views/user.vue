<template lang="html">
    <div>
        <h1>{{user.google.name}}'s Profile Page</h1>
        <p>{{user}}</p>
        <p>0 Notifications</p>
    </div>
    <div id="content" style="width: 500px; height: 300px; margin: 0 0 20px 0; border: solid 1px #999; overflow-y: scroll;"></div>
    <form>
      <input type="text" id="name" name="name" style="width:350px;" /><br />
      <input type="text" id="field" name="field" style="width:350px;" />
      <input type="button" id="send" name="send" value="Send" />
    </form>

    <p id="emails">0</p>
</template>

<script>
export default {
    data: function() {
        return {}
    }
}
</script>

<style lang="css">
    .test {
        color: black;
    }
</style>
