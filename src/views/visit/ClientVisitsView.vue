<template>
    <div v-if="clientData">
      <h1>Detalle de visitas de cliente</h1>
      <div>
        <h2>Información de la client</h2>
        <p>Nombre: {{ clientData.name }}</p>
        <p>Especie: {{ clientData.cooperative }} </p>
      </div>
      <div>
        <h2>Detalle de Visitas</h2>
        <table>
          <thead>
            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Razon</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(visit, index) in listVisits" :key="visit.id">
                <td>{{ index+1 }}</td>
              <td>{{ visit.date }}</td>
              <td>{{ visit.reason }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'ClientVisitsView',
    data() {
      return {
        client: {
          name: 'Juan Pérez',
          ci: '123 Calle Falsa',
          cooperative: '555-1234'
        },
        clientData:null,
        listVisits:[],
        visits: [
          { id: 1, clientsId: '', date: '2022-01-15', reason: '' }
        ]
      };
    },
    methods: {
      getclient(){
        const clientId = this.$route.params.id;
        const vm = this;
        this.axios.get(this.getBaseUrl+"/clients/"+clientId)
        .then(function(response){
          vm.clientData = response.data;
        })
        .catch(function(error){
          console.error(error);
        })
      },
      getVisits(){
        const clientId = this.$route.params.id;
        const vm = this;
        this.axios.get(this.getBaseUrl+"/visits?clientsId="+clientId)
        .then(function(response){
          vm.listVisits = response.data;
        })
        .catch(function(error){
          console.error(error);
        })
      }
    },
    computed: {
      ...mapGetters(['getBaseUrl']),
        clientId() {
        return this.$route.params.id;
      }
    },
    mounted(){
      this.getclient();
      this.getVisits();
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  