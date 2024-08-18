<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <RegisterClientView @on-register="onRegister($event)" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <EditClientView @on-update="onUpdate($event)" :item="itemToEdit" />
        </Modal>
        <h1>Lista de Clientes</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" placeholder="Buscar" @search="buscar()">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Ci</th>
                    <th>Empresa</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.ci }}</td>
                    <td>{{ item.cooperative }}</td>
                    <td>
                        <button @click="clientVisits(item.id)" class="btn btn-info" style="margin-right: 15px;">Visitas</button>
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
import RegisterClientView from './RegisterClientView.vue'
import EditClientView from './EditClientView.vue'

export default {
    name: 'ClientC',
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
        RegisterClientView,
        EditClientView
    },
    methods: {
        ...mapActions(['increment']),
        getList() {
            const vm = this;
            let string_clients = "/clients";
            if(this.textToSearch != ''){
                string_clients = "/clients?q=" + this.textToSearch;
            }
            this.axios.get(this.baseUrl + string_clients)
                .then(function (response) {                    
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        clientVisits(id){
            this.$router.push("/client/"+id+"/visits");
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/clients/" + id)
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
            console.log("on register");
            this.getList();
            this.showModalNuevo = false;
        },
        onUpdate() {
            console.log("on update");
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