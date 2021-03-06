function guardar_localStorage(key,value){
  localStorage.setItem(key,value);
}
function get_localStorage(key){
  let info = localStorage.getItem(key);
  console.log(JSON.parse(info));
  return JSON.parse(info);
}
//Variables Globales
var cua1 = 'Registro'  
  
//Declaracion de Headers
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

//
//PDF
function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 50,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirdata(paciente){
  var data ={
    "NOMBRE":paciente.nombrep,
    "APELLIDO":paciente.apellidop,
    "FECHA":paciente.fechap,
    "SEXO":paciente.sexop,
    "USUARIO":paciente.userp,
    "CONTRASEÑA":paciente.passwordp,
    "TELEFONO":paciente.telp
  }

  return data

}

function crearpdf(){
  
  fetch('http://localhost:5000/obtenerpacientes')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeaders([
      "NOMBRE",
      "APELLIDO",
      "FECHA",
      "SEXO",
      "USUARIO",
      "CONTRASEÑA",
      "TELEFONO"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirdata(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.table(15, 1, datos, headers, { autoSize: false });
    doc.save("Pacientes.pdf")
  })
}

//

//

function cargar(){
    let file = document.getElementById("carga").files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let cuerpo = {
                data:evt.target.result
            }
            console.log(JSON.stringify(cuerpo))
            fetch('http://localhost:5000/cargapacientes', {
            method: 'POST',
            headers,
            body: JSON.stringify(cuerpo),
            })
            .then(response => response.json())
            .then(result => {
              console.log('Success:', result);
              actualizar()
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        reader.onerror = function (evt) {
            
        }
    }
}

//Modificar Datos Personales
function modificicarDatos(){
  let user = document.getElementById("userR");
  let nombrep = document.getElementById("nombreN");
  let apellidop = document.getElementById("apellidoN");
  let passwordp = document.getElementById("contraseñaN");
  let correop = document.getElementById("correoN")

  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  // ENVIAR EL MISMO NUMERO DE REGISTRO DE USUARIO
  let reque = `{
    "nombre":"${nombrep.value}",
    "apellido":"${apellidop.value}",
    "contraseña":"${passwordp.value}",
    "usuario":"${user.value}",
    "correo":"${correop.value}"
  }`

  fetch('http://localhost:5000/usuarios/'+user.value, {
    method: 'PUT',
    headers,
    body: reque,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    nombrep.value=''
    apellidop.value=''
    passwordp.value=''
    correop.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

  

}










function eliminar(paciente,userp){
  fetch('http://localhost:5000/pacientes/'+paciente+'/'+userp,{
  method:'DELETE'
  })
  .then(res => res.text())
  .then(res => {
    alert(res)
    actualizar()
  })
}

function agregarPaciente(){
  let nombrep = document.getElementById("nombrep");
  let apellidop = document.getElementById("apellidop");
  let fechap = document.getElementById("fechap");
  let sexop = document.getElementById("sexop");
  let userp = document.getElementById("userp");
  let passwordp = document.getElementById("passwordp");
  let telp = document.getElementById("telp");
  fetch('http://localhost:5000/pacientes', {
    method: 'POST',
    headers,
    body: `{
        "nombrep":"${nombrep.value}",
        "apellidop":"${apellidop.value}",
        "fechap":"${fechap.value}",
        "sexop":"${sexop.value}",
        "userp":"${userp.value}",
        "passwordp":"${passwordp.value}",
        "telp":"${telp.value}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    nombrep.value=''
    apellidop.value=''
    sexop.value='Selecciona una opcion'
    userp.value=''
    passwordp.value=''
    telp.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

}



function agregarComentario(){
  let nameestudiante = document.getElementById("nameestudiante");
  let cc = document.getElementById("cc");
  let fecha = document.getElementById("fecha");
  let mensaje = document.getElementById("mensaje");
  
  fetch('http://localhost:5000/comentarios', {
    method: 'POST',
    headers,
    body: `{
        "nameestudiante":"${nameestudiante.value}",
        "cc":"${cc.value}",
        "mensaje":"${mensaje.value}",
        "fecha":"${fecha.value}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    // nameestudiante.value=''
    cc.value='Selecciona una opcion'
    mensaje.value=''
    fecha.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

}


function agregarComentario2(){
  let nameestudiante2 = document.getElementById("nombre2");
  let cc2 = document.getElementById("cc2");
  let fecha2 = document.getElementById("fecha2");
  let mensaje2 = document.getElementById("mensaje2");
  
  fetch('http://localhost:5000/comentarios', {
    method: 'POST',
    headers,
    body: `{
        "nameestudiante":"${nameestudiante2.value}",
        "cc":"${cc2.value}",
        "mensaje":"${mensaje2.value}",
        "fecha":"${fecha2.value}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    // nameestudiante.value=''
    cc2.value='Selecciona una opcion'
    mensaje2.value=''
    fecha2.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

}



function actualizar(){
  document.getElementById("cardsc").innerHTML = '';
  let text="";
text = `<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar por curso o catedratico...">
  <tr class="header">
    <th style="width:20%;">#</th>
    <th style="width:40%;">Curso / Catedratico</th>
    <th style="width:100%;">Mensaje</th>
    <th style="width:40%;">Estudiante</th>
    <th style="width:80%;">Fecha</th>
    <th scope="col">Opciones</th>
  </tr> 
<tbody>`

  fetch('http://localhost:5000/obtenercomentarios')
  .then(response => response.json())
  .then(data =>{
      var i;
  
      
      for(i=0;i<data.length;i++){
          text+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].cc}</td>
                  <td>${data[i].mensaje}</td>
                  <td>${data[i].nameestudiante}</td>
                  <td>${data[i].fecha}</td>
                  <td><button href="#" class="btn btn btn-danger" >FORO</button></td>
                  </tr>
                  `
                  // console.log(data[i].nombrep,'prueba')
      }
      text+=`</tbody>
              </table>`
      document.getElementById("cardsc").innerHTML = text;
  });


}


// Carga de Pacientes 2.0

let text2=""
text2 = `<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Buscar por curso o catedratico...">
<table id="myTable">
  <tr class="header">
    <th style="width:20%;">#</th>
    <th style="width:40%;">Curso / Catedratico</th>
    <th style="width:100%;">Mensaje</th>
    <th style="width:40%;">Estudiante</th>
    <th style="width:80%;">Fecha</th>
    <th scope="col">Opciones</th>
  </tr> 
<tbody>`

fetch('http://localhost:5000/obtenercomentarios')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].cc}</td>
                <td>${data[i].mensaje}</td>
                <td>${data[i].nameestudiante}</td>
                <td>${data[i].fecha}</td>
                <td><button href="#" class="btn btn btn-danger" >FORO</button></td>
                </tr>
                `
    }
    text2+=`</tbody>
            </table>`
    document.getElementById("tablapacientes").innerHTML = text2;
});







//Buscar Usuario
function BuscarUsuarios(){
  let userB = document.getElementById("userB");
  // let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Accept', 'application/json');
  fetch(`http://localhost:5000/obtenerUnicoUsuario/${userB.value}`)
  // Convirtiendo de string a texto
  .then(response => response.json())
  // Manejando la data
  .then(data => {
       if(data.nombre =="false"){
           alert('Usuario No Encontrado')
       }else{
           alert(`Usuario ${data.user}`)
           cua1 = data.user;
           mostrarTabla(cua1)
           guardar_localStorage("Perfil",JSON.stringify(data))
       }
    })

}




// MOSTRAR TABLA DE USUARIO BUSCADO //POR ALGUNA RAZON NO ACTUALIZA
function mostrarTabla(dato){
  document.getElementById("cardq").innerHTML = '';
  let text5=""
  
//
fetch(`http://localhost:5000/obtenerUnicoUsuario/${dato}`)
.then(response => response.json())
.then(data => {
     console.log(data.nombre)
     if(data.nombre=="false"){
         alert('Usuario No Encontrado')
     }else{
        //  alert(`Usuario ${data.user}`)
        alert(`Usuario ${data.user}`)
text5 = `<table id="myTable">
<tr class="header">
    <th style="width:60%;">Nombre</th>
    <th style="width:60%;">Apellido</th>
    <th style="width:60%;">Correo</th>
    <th style="width:60%;">Más</th>
  </tr> 
<tbody>
  <tr>
  <td>${data.nombre}</td>
  <td>${data.apellido}</td>
  <td>${data.correo}</td>
  <td><a class="btnver btn btn-secondary" href="./Perfil.html">Ver Usuario</a></td>
  </tr>

</tbody>
</table>`
document.getElementById("cardq").innerHTML = text5;
     }
  })
//

}

function pop(){
  console.log("HOla xd")
}

//Mostrar Tabla desde un Inicio 

fetch(`http://localhost:5000/obtenerUnicoUsuario/${"rol"}`)
// Convirtiendo de string a texto
.then(response => response.json())
// Manejando la data
.then(data => {
     console.log(data.nombre)
     if(data.nombre=="false"){
         alert('Usuario No Encontrado')
     }else{
         alert(`Usuario ${data.user}`)
         let text5=""
text5 = `<table id="myTable">
<tr class="header">
    <th style="width:60%;">Nombre</th>
    <th style="width:60%;">Apellido</th>
    <th style="width:60%;">Correo</th>
  </tr> 

  <tr>
  <td>${data.nombre}</td>
  <td>${data.apellido}</td>
  <td>${data.correo}</td>
  </tr>

<tbody>`

text5+=`</tbody>
</table>`
document.getElementById("tablaUsuario").innerHTML = text5;
     }
  })



