
let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://35.193.113.191:5000/obtenersolicitudes')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text2+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].fechac}</td>
                  <td>${data[i].horac}</td>
                  <td>${data[i].motivoc}</td>
                  <td><button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].fechac}','${data[i].horac}')">Declinar</button></td>
                  <td><button href="#" class="btn btn btn-success" onclick="eliminar('${data[i].fechac}','${data[i].horac}')">Aceptar</button></td>
                  </tr>
                `
    }
    text2+=`</tbody>
            </table>`
    document.getElementById("tablasolicitudes").innerHTML = text2;
});

function eliminar(fechac,horac){
  fetch('http://35.193.113.191:5000/solicitudes/'+fechac+'/'+horac,{
  method:'DELETE'
  })
  .then(res => res.text())
  .then(res => {
    alert(res)
    actualizar()
  })
}




function actualizar(){
document.getElementById("cardsc").innerHTML = '';
let text="";
text = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Fecha</th>
<th scope="col">Hora</th>
<th scope="col">Motivo</th>
<th scope="col">Opciones</th>
</tr>
</thead>
<tbody>`

  fetch('http://35.193.113.191:5000/obtenersolicitudes')
  .then(response => response.json())
  .then(data =>{
      var i;
  
      
      for(i=0;i<data.length;i++){
          text+= `
                  <tr>
                  <th scope="row">${i+1}</th>
                  <th scope="row">${i+1}</th>
                  <td>${data[i].fechac}</td>
                  <td>${data[i].horac}</td>
                  <td>${data[i].motivoc}</td>
                  <td><button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].fechac}','${data[i].horac}')">Declinar</button></td>
                  <td><button href="#" class="btn btn btn-success" onclick="eliminar('${data[i].fechac}','${data[i].horac}')">Aceptar</button></td>
                  </tr>
                  `
                  console.log(data[i].nombrep,'prueba')
      }
      text+=`</tbody>
              </table>`
      document.getElementById("cardsc").innerHTML = text;
  });

}

