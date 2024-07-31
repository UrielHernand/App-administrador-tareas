
import { createStore } from 'vuex'
import router from '../router'



export default createStore({
  state: {
    tareas: [],
    tarea : {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero:0,
     
    },
    user : null,
    error: {tipo: null, message:null}

  },
  mutations: {

    setError(state,payload){
      if (payload == null){
        return  state.error =={ tipo:null, message:null}
      }
      if (payload === "EMAIL_NOT_FOUND"){
        return state.error =={ tipo:'email', message:'Email no registrado'}
      }
    },
    setUser (state , payload){
      state.user = payload
    },
    cargar (state , payload){
      state.tareas = payload
    },
    set (state,payload){
      state.tareas.push(payload)
     

    
    },
    eliminar (state, payload){
      state.tareas = state.tareas.filter (item => item.id !== payload)
    },
    tarea (state, payload){
      if (!state.tareas.find (item => item.id === payload)){
        router.push('/')
        return
      }
      state.tarea = state.tareas.find (item => item.id === payload)
 
    },
    update (state , payload){
      state.tarea = state.tareas.map (item => item.id === payload.id ? payload : item)
      router.push('/')
    }
    
  },
  actions: {
    cerrarSesion({commit}){
      commit('setUser',null)
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    },
    async ingresoUsuario ({commit}, usuario){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACs5fN-bymE7f5Kz1mrqLtERSgQv41r8o',
        {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken : true
         })
         
        })
        const userDB = await res.json()
        //console.log('userDB',userDB)
        if (userDB.error){
          return console.log (userDB.error)
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario',JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
        
      }
      
    },
    async registrarUsuario ({commit}, usuario){
       try {
         
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACs5fN-bymE7f5Kz1mrqLtERSgQv41r8o',
        {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken : true
         })
        })
        const userDB = await res.json()
        //console.log(userDB)
        if (userDB.error){
          console.log(userDB.eror)
          return commit('setError',userDB.error.message)
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario',JSON.stringify(userDB))
       } catch (error) {
         console.log(error)
         
       }
    },
    async cargarLocalStorage ({ commit, state }) {
      if (localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      }else{
        return commit('setUser', null)
      }
       
      try {
        const res = await fetch(`https://utt-api-b-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataBD = await res.json()

        const arrayTareas = []
        
        for(let id in dataBD){
          //console.log(id)
          //console.log(dataBD[id])
          arrayTareas.push(dataBD[id])
        }
        //console.log(arrayTareas)
        commit ('cargar' , arrayTareas)


      } catch (error) {
        console.log(error)
      }
 
    },
     async setTareas ({commit, state} , tarea) {
       try {
         const res = await fetch(`https://utt-api-b-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}` , {
         method: 'PUT', 
         headers: {
           'Content-Type' : 'application/json '

          },
          body: JSON.stringify(tarea) 
         })

         const dataBD = await res.json()
         console.log(dataBD)

       } catch (error) {
         console.log(error)
       }
      commit('set', tarea)
    },
    async deleteTareas ({commit ,state}, id){

      try {
        await fetch(`https://utt-api-b-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
          
        })
        commit('eliminar', id)
      } catch (error) {
        console.log(error)
        
      }
     


    },
    setTarea ({ commit }, id){
      commit('tarea', id)

    },
    async updateTarea ({commit, state}, tarea) {
      try {
        const res = await fetch(`https://utt-api-b-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,{
          method: 'PATCH',
          body : JSON.stringify(tarea)

        })
        const dataBD = await res.json()
        //console.log(dataBD)
        commit('update', tarea)
        
      } catch (error) {
        
        console.log(error)
      }
      

    }
    
  },
  getters:{
    usuarioAutenticado( state){
      return !!state.user
      //Si no existe retorna false y si existe true 
    }
  },
  modules: {
  }
})
