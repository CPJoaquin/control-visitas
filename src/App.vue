<template>
    <Menu>
    <router-link to="/">Home</router-link>
    <router-link to="/client">Clientes</router-link>
  </Menu>
  <router-view />
</template>
<script>
import {mapGetters } from 'vuex'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Menu
  },
  methods: {
  },
  computed: {
    ...mapGetters(['rol'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
