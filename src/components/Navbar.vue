<template>
  <div class="navbar navbar-dark bg-dark">
     <router-lok to ="/" class="navbar-brand">
         Formulario

     </router-lok>
     <div class="d-flex">
         <router-link 

         class="btn btn-dark" to="/"
         v-if="usuarioAutenticado"
         
         > Tareas </router-link>

         <router-link 

         class="btn btn-dark" 
         to="/ingreso"
         v-if="!usuarioAutenticado"
         
         >Ingresar</router-link>
         <router-link 

         class="btn btn-dark" 
         to="/registro"
         v-if="!usuarioAutenticado"
         
         >Registrar</router-link>

         <button 
         v-if="usuarioAutenticado"
         class="btn btn-dark"
         @click="cerrarSesion"
         >
           Cerrar Sesión
         </button>

     </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
      ...mapGetters  (['usuarioAutenticado'] )
    },
    methods:{
      ...mapActions(['cerrarSesion'])
    }
}
</script>

