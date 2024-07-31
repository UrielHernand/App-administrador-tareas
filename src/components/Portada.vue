<template>
 

  <div class="card" style="width: 18rem;">
  <img src="http://uttehuacan.edu.mx/web/images/logo_2020p.png " class="card-img-top " alt="...">
  <div class="card-body ">
    <h5 class="card-title">UNIVERSIDAD TECNOLÓGICA DE TEHUACÁN</h5>
    <p class="card-text">  
        Desarrollo de software Multiplataforma
        <br>Aplicaciones Web Orientada a Servicios
        <br>Práctica 10-Deploy
        
         </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item bg-success " >App-Auth</li>
    <li class="list-group-item bg-success">Uriel Hernández Carrera  4 "B" </li>
  
  </ul>
 
</div>
</template>

<script>
export default {
    name:'Portada',
    data(){
        return{
            query:''
        }
    }

}
</script>

<style>
.logo{
    height: 90%;
    justify-content: space-between;
    
    display: flex;
    
    list-style: none;
    margin-left: 10%;
    width: 100%;



}
.img, .img1{
  height: 58%;
}
.port{
    margin-top: 0%;
    height: 100%;
    margin: auto;
}
.img1{
    border-radius: 80px;
    margin-left: 10%;

}
.img2{
    width: 20%;
    margin-left: 40%;
    margin-bottom: 10%;
    border-radius: 69px;
    
}
.datos{
    margin: auto;
    margin-left: 150px;
    

}
.card-body{
    color: black;
    
}

.list-group-item{
    color: white;
}

</style>