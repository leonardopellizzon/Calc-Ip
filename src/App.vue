<template>
  <div class="m-5">
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control text-center"
      placeholder="Indirizzo"
      aria-label="Username"
      v-model="indirizzo"
    />
    <input
      type="text"
      class="form-control text-center"
      placeholder="Prefisso"
      aria-label="Server"
      v-model="prefisso"
    />
    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="richiedi(indirizzo,prefisso)">
      Calcola
    </button>
  </div>
  <div class="table-responsive-xl  rounded">
    <table class="table table-dark table-striped">
      <tbody>
        <tr class="table-danger">
          <th scope="row">Indirizzo analizzato</th>
          <td>{{ indirizzo_cidr }}</td>
        </tr>
        <tr class="table-success">
          <th scope="row">Subnet mask</th>
          <td>{{ subnet }}</td>
        </tr>
        <tr class="table-primary">
          <th scope="row">Broadcast</th>
          <td>{{ broadcast }}</td>
        </tr>
        <tr class="table-primary">
          <th scope="row">ID rete</th>
          <td>{{ idRete }}</td>
        </tr>
        <tr>
          <th scope="row">Primo indirizzo disponibile</th>
          <td>{{ primoInd }}</td>
        </tr>
        <tr>
          <th scope="row">Ultimo indirizzo disponibile</th>
          <td>{{ ultimoInd }}</td>
        </tr>
        <tr class="table-warning">
          <th scope="row">Host totali</th>
          <td>{{ numeroHost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      axios: require("axios"),
      data: null,
      indirizzo_cidr: null,
      subnet: null,
      broadcast: null,
      idRete: null,
      primoInd: null,
      ultimoInd: null,
      numeroHost: null,
    };
  },
  mounted() {},
  methods: {
    richiedi(indirizzo, prefisso) {
      if(indirizzo == undefined || prefisso == undefined) return
      this.axios
        .get("https://networkcalc.com/api/ip/"+indirizzo+"/" + prefisso)
        .then((res) => {
          console.log(res.data.address);
          this.data = res.data;
          this.indirizzo_cidr = res.data.address.cidr_notation;
          this.subnet = res.data.address.subnet_mask;
          this.broadcast = res.data.address.broadcast_address;
          this.idRete = res.data.address.network_address;
          this.primoInd = res.data.address.first_assignable_host;
          this.ultimoInd = res.data.address.last_assignable_host;
          this.numeroHost = res.data.address.assignable_hosts;
        });
    },
  },
};
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