<template>
  <div>
      <Modal v-model:modelValue="showModalNuevo">
          <RegisterVisitView @on-register="onRegister($event)" />
      </Modal>
      <Modal v-model:modelValue="showModalEdit">
          <EditVisitView @on-update="onUpdate($event)" :item="itemToEdit" />
      </Modal>
      <h1>Lista de Visitas</h1>
      <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
      <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
      <input type="search" style="float:right" v-model="textToSearch" placeholder="Buscar" @search="buscar()">
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Motivo</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in itemList" :key="index">
                  <td>{{ 1 + index }}</td>
                  <td>{{ item.clients ? item.clients.name : '??' }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.reason }}</td>
                  <td>
                      <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
                      <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import RegisterVisitView from './RegisterVisitView.vue'
import EditVisitView from './EditVisitView.vue'

export default {
  name: 'VisitC',
  data() {
      return {
          message: 'Hola Mundo',
          currentPage: 1,
          totalPages: 100, 
          showModalNuevo: false,
          showModalEdit: false,
          itemToEdit: null,
          textToSearch: '',
          itemList: []
      }
  },
  components: {
      
      Modal,
      RegisterVisitView,
      EditVisitView
  },
  methods: {
      
      ...mapActions(['increment']),
      getList() {
          const vm = this;
          let string_visits = "/visits?_expand=clients&_sort=date&_order=asc";
          if(this.textToSearch != ''){
              string_visits = "/visits?_expand=clients&_sort=date&_order=asc&q=" + this.textToSearch;
          }
          this.axios.get(this.baseUrl + string_visits)
              .then(function (response) {                                    
                  vm.itemList = response.data;
              })
              .catch(function (error) {
                  console.error(error);
              });
      },
      edit(item) {
          this.itemToEdit = Object.assign({}, item);
          this.showModalEdit = true;
      },
      Eliminar(id) {
          if (confirm("¿Esta Seguro de eliminar el registro?")) {
              const vm = this;
              this.axios.delete(this.baseUrl + "/visits/" + id)
                  .then(function (response) {
                      console.log(response);
                      vm.getList();
                  })
                  .catch(function (error) {
                      console.error(error);
                  });
          }

      },
      buscar() {
          this.getList();
      },
      onRegister() {
          this.getList();
          this.showModalNuevo = false;
      },
      onUpdate() {
          this.getList();
          this.showModalEdit = false;
          this.itemToEdit = null;
      }
  },
  computed: {
      
      ...mapState(['count']),
      ...mapGetters(['doubleCount', 'getBaseUrl']),
      baseUrl() {
          return this.getBaseUrl
      }
  },
  props: {
      
  },
  mounted() {
      this.getList();
  },
  emits: [] 
}
</script>

<style></style>