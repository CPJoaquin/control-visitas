<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MiComponente',
    data() {
      return {
        message: 'Hola Mundo'
      }
    },
    components: {
      // Registro de componentes que se utilizaran.
    },
    methods: {
      // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
    },
    computed: {
      // propiedades computadas que dependen de otras propiedades reactivas
    },
    props: {
      // propiedades que el componente puede recibir.
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
  }
  </script>
  
  <style>
  h1 {
    color: #42b983;
  }
  </style>
  