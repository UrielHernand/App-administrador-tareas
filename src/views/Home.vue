<template>
<h1 class="my-5"> Formularios con vue.js</h1>
  <form @submit.prevent="procesarFormulario">
     <Input :tarea="tarea" />
  </form>
  <hr>

  <!-- <p>{{ tarea }} </p> -->

  <ListaTareas/>
   <div class="home">
   

     
    

  </div>
</template>

<script>
import Portada from '../components/Portada.vue'
import Input from '../components/Input.vue'
import { mapActions} from 'vuex'
const shortid = require ('shortid');
import ListaTareas from '../components/ListaTareas.vue'


export default {
  
  name: 'Home',
  components: {
    Input,ListaTareas,Portada
   
    
  },

  data() {
    return {
     tarea: {
       id: '',
       nombre:'',
       categorias: [],
       estado: '',
       numero: 0,
       
     }
    }
  },
  methods: {
    ...mapActions (['setTareas', 'cargarLocalStorage']),

    procesarFormulario () {
      console.log(this.tarea)
      if (this.tarea.nombre.trim() === ""){
        console.log('Campo vacio...')
        return
      }
      console.log('No esta vacío...')

     
     
       //genarar id 
       this.tarea.id = shortid.generate()
       console.log( this.tarea.id)

      //enviamos datos 
      this.setTareas(this.tarea)
      

      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
  computed: {
      bloquear () {
          return this.tarea.nombre.trim() === "" ? true : false
    }
  },
  created () {
    this.cargarLocalStorage ()
  }
  
  
}

</script>
<style scoped>
.home{
  
  height: 100%;
  width: auto;
}
.port{
  height: 100%;
 background-image: url("https://www.centroweb.cl/wp-content/uploads/2018/08/desarrollo-web-centroweb.cl_.jpg");
 background-repeat: no-repeat;
 
 
 color: white;
 border-radius: 30px;
 margin-top: 30px;

}


</style>
