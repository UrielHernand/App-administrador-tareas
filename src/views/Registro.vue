<template>
  <h1 class="my-5 ">Registro de Usuarios</h1>
  <form @submit.prevent="procesarFormulario">
      <input 
      type="email" name="" 
       placeholder="email"
       class="form-control my-2"
       v-model.trim="email"
      >
      <input 
      type="password" 
      placeholder="password"
      class="form-control my-2"
      v-model.trim="pass1"

      >
      <input
       type="password" 
       placeholder="password"
       class="form-control my-2"
       v-model.trim="pass2"
       >
      <button type="submit"
      class="btn btn-primary"
      :disabled="bloquear"
      >
      Registrar
      </button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            email: '',//a3520110324@alumno.uttehuacan.edu.mx'
            pass1 : '',
            pass2 : '',

        }
    },
    computed :{
        bloquear () {
            if (!this.email.includes('@')){
               return true
            }

            if (this.pass1.length > 5 && this.pass1 == this.pass2){
                return false
            }
            return true
        }
    },
    methods : {
        ...mapActions(['registrarUsuario']),
        procesarFormulario (){
            this.registrarUsuario({email: this.email, password : this.pass1})
            this.email = '',
            this.pass1 = '',
            this.pass2 = ''
        }
    }

}
</script>

