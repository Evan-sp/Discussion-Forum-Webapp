<template>
  <div id="app" class="main" style="width: 95%; padding: 10px; margin: auto; marginTop: 10px; ">
    <myHeader></myHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    components: {
      'myHeader' : Header,
    },
}
</script>

<style>

</style>
