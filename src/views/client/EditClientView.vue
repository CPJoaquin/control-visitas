<template>
  <div>
    <h1>Editar Cliente</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="ci">Ci:</label>
        <input type="text" id="ci" v-model="form.ci" :class="{ 'is-invalid': errors.ci }"
          placeholder="Ingrese el ci" />
        <div v-if="errors.ci" class="invalid-feedback">{{ errors.ci }}</div>
      </div>

      <div class="form-group">
        <label for="cooperative">Empresa:</label>
        <textarea id="cooperative" v-model="form.cooperative" :class="{ 'is-invalid': errors.cooperative }"
          placeholder="Ingrese la empresa"></textarea>
        <div v-if="errors.cooperative" class="invalid-feedback">{{ errors.cooperative }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'EditClient',
  data() {
    return {

      errors: {}
    };
  },
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.item.name) {
        this.errors.name = 'El nombre es obligatorio.';
      }

      if (!this.item.ci) {
        this.errors.ci = 'El ci es obligatorio.';
      } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.item.ci)) {
        this.errors.ci = 'El ci no es válido.';
      }

      if (!this.item.cooperative) {
        this.errors.cooperative = 'La empresa es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
       
        this.save();
       
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/clients/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          console.log(response); vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  computed: {
   
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form() {
      return Object.assign({}, this.item);
    }
  },
}
</script>
  
<style scoped></style>
  