 //Declaracion de Headers

 let headers = new Headers()
 headers.append('Content-Type', 'application/json');
 headers.append('Accept', 'application/json');
 headers.append('Access-Control-Allow-Origin', 'http://35.193.113.191:5000');
 headers.append('Access-Control-Allow-Credentials', 'true');
 headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Estado de su Cita</th>
</tr>
</thead>
<tbody>`

fetch('http://35.193.113.191:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].estadoc}</td>
                </tr>
                `
    }
    text2+=`</tbody>
            </table>`
    document.getElementById("tablacitas").innerHTML = text2;
});1





let text3=""
text3 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Descripcion</th>
<th scope="col">Precio</th>
<th scope="col">Cantidad en el Almacen</th>
<th scope="col">Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://35.193.113.191:5000/obtenermedicamentos')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
        text3+= `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${data[i].nombremed}</td>
                <td>${data[i].descripcionmed}</td>
                <td>${data[i].preciomed}</td>
                <td>${data[i].cantidadmed}</td>
                <td><button href="#" class="btn btn btn-danger" onclick="comprar('${data[i].nombremed}','${data[i].cantidadmed}')">Comprar</button></td>
                </tr>
                `
    }
    text3+=`</tbody>
            </table>`
    document.getElementById("tablamedicamentos").innerHTML = text3;
});


function comprar(){

    fetch('http://35.193.113.191:5000/obtenermedicamentos')
    .then(response => response.json())
    .then(data =>{
        var i;
        for(i=0;i<data.length;i++){
         
            let cantidad_o =(data[i].cantidadmed);

            let headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('Accept', 'application/json');
        
          
            fetch('http://35.193.113.191:5000/medicamentos/'+cantidad_o.value, {
              method: 'PUT',
              headers,
              
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
        
        document.getElementById("tablamedicamentos").innerHTML = text3;
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
  <th scope="col">Descripcion</th>
  <th scope="col">Precio</th>
  <th scope="col">Cantidad en el Almacen</th>
  <th scope="col">Opciones</th>
  </tr>
  </thead>
  <tbody>`
  
  
    fetch('http://35.193.113.191:5000/obtenermedicamentos')
    .then(response => response.json())
    .then(data =>{
        var i;
    
        
        for(i=0;i<data.length;i++){
            text+= `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${data[i].nombremed}</td>
            <td>${data[i].descripcionmed}</td>
            <td>${data[i].preciomed}</td>
            <td>${data[i].parseInt(cantidadmed)-1}</td>
            <td><button href="#" class="btn btn btn-danger" onclick="comprar('${data[i].nombremed}','${data[i].cantidadmed}')">Comprar</button></td>
            </tr>
            `
                    console.log(data[i].nombrep,'prueba')
        }
        text+=`</tbody>
                </table>`
        document.getElementById("cardsc").innerHTML = text;
    });
  
  
  }
  


  //ESTOY HASTA LA MADRE PERO ESTA ES LA SOLICITUD
    function agregarsolicitud(){
      let fechac = document.getElementById("fechac");
      let horac = document.getElementById("horac");
      let motivoc = document.getElementById("motivoc");
      fetch('http://35.193.113.191:5000/solicitudes', {
        method: 'POST',
        headers,
        body: `{
            "fechac":"${fechac.value}",
            "horac":"${horac.value}",
            "motivoc":"${motivoc.value}"
          }`,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        //actualizar()
        fechac.value=''
        horac.value=''
        motivoc.value=''
        alert('Su solicitud a sido Enviada')
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    }