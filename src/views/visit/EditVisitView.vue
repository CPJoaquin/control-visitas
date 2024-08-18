<template>
  <div>
    <h1>Editar Visita</h1>
    <form @submit.prevent="submitForm" v-if="form">
      <div class="form-group">
        <label for="clientsId">Cliente:</label>
        <select id="clientsId" v-model="form.clientsId" :class="{ 'is-invalid': errors.clientsId }">
          <option :value="client.id" v-for="(client, index) in clientList" :key="`client-${index}`">{{ client.name }}
          </option>
        </select>
        <div v-if="errors.clientsId" class="invalid-feedback">{{ errors.clientsId }}</div>
      </div>

      <div class="form-group">
        <label for="date">Fecha:</label>
        <input type="text" id="date" v-model="form.date" :class="{ 'is-invalid': errors.date }"
          placeholder="Ingrese la date" />
        <div v-if="errors.date" class="invalid-feedback">{{ errors.date }}</div>
      </div>

      <div class="form-group">
        <label for="reason">Motivo:</label>
        <input type="text" id="reason" v-model="form.reason" :class="{ 'is-invalid': errors.reason }"
          placeholder="Ingrese la reason" />
        <div v-if="errors.reason" class="invalid-feedback">{{ errors.reason }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'VisitEdit',
  data() {
    return {
      clientList: [],
      especieList: [
        "Perro",
        "Gato"
      ],
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.date) {
        this.errors.date = 'La fecha es obligatoria.';
      }

      if (!this.form.reason) {
        this.errors.reason = 'El motivo es obligatoria.';
      }

      if (!this.form.clientsId) {
        this.errors.clientsId = 'El Cliente es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      console.log(this.validateForm());
      
      if (this.validateForm()) {
        this.save();
        this.form = {
          date: '',
          reason: '',
          clientsId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/visits/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getClientList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/clients")
        .then(function (response) {
          vm.clientList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form() {
      return Object.assign({},this.item);
    }
  },
  mounted() {
    this.getClientList();
  },
  props: ['item']
}
</script>
  
<style scoped></style>
  