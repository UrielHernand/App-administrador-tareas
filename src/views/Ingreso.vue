<template>
  <h1 class="my-5 ">Ingreso de Usuarios</h1>
  <div class="alert alert-danger" v-if="error.tipo !== null">
      {{error.mensaje}}
  </div>
  <form @submit.prevent="procesarFormulario">
      <input 
      type="email" name="" 
       placeholder="email"
       class="form-control my-2"
       v-model.trim="email"
       :class="[error.tipo === 'email' ? 'is-invalid' : '']"
      >
      <input 
      type="password" 
      placeholder="password"
      class="form-control my-2"
      v-model.trim="pass1"

      >
      
      <button type="submit"
      class="btn btn-primary"
      :disabled="bloquear"
      >
      Ingresar
      </button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            email: '', //a3520110324@alumno.uttehuacan.edu.mx
            pass1 : '' //123456
            

        }
    },
    computed :{
        bloquear () {
            if (!this.email.includes('@')){
               return true
            }

            if (this.pass1.length > 5 ){
                return false
            }
            return true
        },
        ...mapState(['error'])
    },
    methods : {
        ...mapActions(['ingresoUsuario']),
       async  procesarFormulario (){
            await this.ingresoUsuario({email: this.email, password : this.pass1})
            if (this.error.tipo !== null){
                return
            }
            this.email = '',
            this.pass1 = ''
           
        }
    }

}
</script>

