//LocalStorage
function guardar_localStorage(key,value){
  localStorage.setItem(key,value);
}
function get_localStorage(key){
  let info = localStorage.getItem(key);
  console.log(JSON.parse(info));
  return JSON.parse(info);
}
//Declaracion de Headers
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


//Funcion para registrar usuarios
function CrearPaciente(){
    let nombre = document.getElementById("nombrep");
    let apellido = document.getElementById("apellidop");
    let user = document.getElementById("userp");
    let correo = document.getElementById("correop");
    let password = document.getElementById("passwordp");
    fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers,
      body: `{
          "nombre":"${nombre.value}",
          "apellido":"${apellido.value}",
          "contraseña":"${password.value}",
          "usuario":"${user.value}",
          "correo":"${correo.value}"
        }`,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      nombre.value=''
      apellido.value=''
      user.value=''
      correo = ''
      passwordp.value=''
      alert('Usuario Registrado');
    })
    .catch(error => {
      console.error('Error:', error);
    });

  
  }

// Funcion para Iniciar Sesion
function IniciarSesion(){
    let usuario = document.getElementById("lUsuario");
    let pass = document.getElementById("lPassword");
    fetch(`http://localhost:5000/login/${usuario.value}/${pass.value}`)
    // Convirtiendo de string a texto
    .then(response => response.json())
    // Manejando la data
    .then(data => {
        console.log(data.nombre)
        if(data.nombre=="false"){
            alert('Verifique sus Credenciales')
            pass.value='';
            usuario.value='';
        }else{
            alert(`Bienvenido ${data.nombre}`)
            cua =data.nombre;
            window.location.href='../Pagina/inicio.html'
            guardar_localStorage("UserActual",cua)
        }
    })

}


//Inicia Sesion como Paciente
function IniciarSesionp(){
  let usuariop = document.getElementById("lUsuariop");
  let passp = document.getElementById("lPasswordp");
  fetch(`http://localhost:5000/login/${usuariop.value}/${passp.value}`)
  // Convirtiendo de string a texto
  .then(response => response.json())
  // Manejando la data
  .then(data => {
      console.log(data.nombrep)
      if(data.nombre=="false"){
          alert('Verifique sus Credenciales')
          pass.value='';
          usuario.value='';
      }else{
          alert(`Bienvenido ${data.nombrep}`)
          window.location.href='../Paciente/paciente.html'
      }
  })


}


//Inicia Sesion como Enfermero
  function IniciarSesionef(){
  let usuarioef = document.getElementById("lUsuarioef");
  let passef = document.getElementById("lPasswordef");
  fetch(`http://localhost:5000/login/${usuarioef.value}/${passef.value}`)
  // Convirtiendo de string a texto
  .then(response => response.json())
  // Manejando la data
  .then(data => {
      console.log(data.nombrep)
      if(data.nombre=="false"){
          alert('Verifique sus Credenciales')
          pass.value='';
          usuario.value='';
      }else{
          alert(`Bienvenido ${data.nombree}`)
          window.location.href='../Enfermero/Penfermeros.html'
      }
  })

}




  //DOCTOR
  function IniciarSesiondoc(){
  let userm = document.getElementById("lUsuariodoc");
  let passwordm = document.getElementById("lPassworddoc");
  fetch(`http://localhost:5000/login/${userm.value}/${passwordm.value}`)
  // Convirtiendo de string a texto
  .then(response => response.json())
  // Manejando la data
  .then(data => {
      console.log(data.nombrem)
      if(data.nombre=="false"){
          alert('Verifique sus Credenciales')
          pass.value='';
          usuario.value='';
      }else{
          alert(`Bienvenido ${data.nombrem}`)
          window.location.href='../Doctor/doctor.html'
      }
  })

}


//Desbloquear el Boton de Registro
var btnEnviar = document.getElementById("btnEnviar");
var passwordp = document.getElementById("passwordp");

btnEnviar.disabled = true;
btnEnviar.disabled = true;

function verificar2(valor) {
  if (passwordp.value.length>3){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("disabled");
  } else {
      btnEnviar.disabled = true;
  }
}