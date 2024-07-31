<template>
  
 
   <Navbar/>
    <div class="container">
        <router-view/>
    </div>
   
      <Portada class="port"/>
</template>

<script>

import {mapActions} from 'vuex'
import Navbar from './components/Navbar.vue'
import Portada from './components/Portada.vue'

export default{
  components:{
    Navbar,Portada
  },

  methods: {
    ...mapActions (['cargarLocalStorage'])
  },
  created () {
    this.cargarLocalStorage ()
  }
  
 
}
</script>

