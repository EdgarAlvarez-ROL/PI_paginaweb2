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

//ARREGLAR pal usuario
function modificarPaciente(){
  let nombrep_o = document.getElementById("vnombrep");
  let nombrep = document.getElementById("mnombrep");
  let apellidop = document.getElementById("mapellidop");
  let passwordp = document.getElementById("mpasswordp");
  let correop = document.getElementById("mcorreop")

  let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  // ENVIAR EL MISMO NUMERO DE REGISTRO DE USUARIO
  let reque = `{
    "nombre":"${nombrep.value}",
    "apellido":"${apellidop.value}",
    "contraseña":"${passwordp.value}",
    "usuario":"${userp.value}",
    "correo":"${correop.value}"
  }`

  fetch('http://localhost:5000/pacientes/'+nombrep_o.value, {
    method: 'PUT',
    headers,
    body: reque,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    nombrep_o.value=''
    nombrep.value=''
    apellidop.value=''
    // userp.value=''
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
    nameestudiante.value=''
    cc.value='Selecciona una opcion'
    mensaje.value=''
    fecha.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

}



function actualizar(){
  document.getElementById("cardsc").innerHTML = '';
  let text="";
text = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Curso/Catedratico</th>
<th scope="col">Mensaje</th>
<th scope="col">Fecha</th>
</tr>
</thead>
<tbody>`

  fetch('http://localhost:5000/obtenercomentarios')
  .then(response => response.json())
  .then(data =>{
      var i;
  
      
      for(i=0;i<data.length;i++){
          text+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].nameestudiante}</td>
                  <td>${data[i].cc}</td>
                  <td>${data[i].mensaje}</td>
                  <td>${data[i].fecha}</td>
                  </tr>
                  `
                  // console.log(data[i].nombrep,'prueba')
      }
      text+=`</tbody>
              </table>`
      document.getElementById("cardsc").innerHTML = text;
  });


}



  // Carga Pacientes
/*
  let text="";
  fetch('http://localhost:5000/obtenerpacientes')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `<br>
                  <div class="col-sm-5 col-md-5 col-lg-5" style="margin-top: 30px;border-style: dotted;">
                  <div class="card bg-light" style="width: auto;">
                  <div class="card-body">
                      <h4 class="card-title">${data[i].nombrep}</h4>
                      <h4 class="card-title">${data[i].apellidop}</h4>
                      <h4 class="card-title">${data[i].fechap}</h4>
                      <h4 class="card-title">${data[i].sexop}</h4>
                      <h4 class="card-title">${data[i].userp}</h4>
                      <h4 class="card-title">${data[i].passwordp}</h4>
                      <h4 class="card-title">${data[i].telp}</h4>
                      <button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].nombrep}','${data[i].userp}')">Eliminar</button>
                  </div>
                  </div>
                  </div>
                  <br>`
          console.log(data[i].nombrep,'prueba')
      }
      document.getElementById("cardsc").innerHTML = text;
  });

  */


// Carga de Pacientes 2.0

let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Curso/Catedratico</th>
<th scope="col">Mensaje</th>
<th scope="col">Fecha</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenercomentarios')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].nameestudiante}</td>
                <td>${data[i].cc}</td>
                <td>${data[i].mensaje}</td>
                <td>${data[i].fecha}</td>
                </tr>
                `
    }
    text2+=`</tbody>
            </table>`
    document.getElementById("tablapacientes").innerHTML = text2;
});