//const urlRaiz = "https://dry-plateau-16443.herokuapp.com";
const urlRaiz = "http://localhost:8080";
//const urlRaiz = "http://18.228.203.151:8080";

const url = `${urlRaiz}/api/v1/products`;
const urlUpload = `${urlRaiz}/api/v1/products/files`;

const btnUpload = document.querySelector('#upload');
const imageResult = document.querySelector('#image');
const linkDownload = document.querySelector('#link');

btnUpload.addEventListener('click',e=>{
    e.preventDefault();

    const formDataAws = new FormData
    const nombre = document.getElementById('nameInput')
    const categoria = document.getElementById('categoryInput')
    const precio = document.getElementById('priceInput')
    //array
    const arrayCarac = [];
    const carac = document.getElementsByClassName('caracInput'),
    namesValue = [].map.call(carac, function(dataInput){
      arrayCarac.push(dataInput.value);
    })
    
    const file = document.querySelector('#file').files[0];

    
    const urlArmada = `/images/${file.name}`

    const productoNuevo = {
      name: nombre.value,
      category: categoria.value,
      price: parseInt(precio.value),
      caracteristicas: arrayCarac,
      imageUrl: urlArmada
    }
    const datos = JSON.stringify(productoNuevo)
    
    //para subir la imagen a aws
   
    console.log(file);
    console.log(file.name);
    console.log(productoNuevo);
    console.log(datos);
    console.log(JSON.parse(datos));
    formDataAws.append('file',file)
    formDataAws.append('datos',datos)
        
    uploadFile(formDataAws);
   
});

const uploadFile = (formDataParam) => {

    fetch(urlUpload,{
        method:'POST',
        body:formDataParam
    })
  };




async function subirImagen() {
    const form = document.getElementById('uploadImage')
    const formDataInfo = new FormData(form);
  
    async function createProduct() {
  
      const nombre = document.getElementById('nameInput')
      const categoria = document.getElementById('categoryInput')
      const precio = document.getElementById('priceInput')
      //array
      const arrayCarac = [];
      const carac = document.getElementsByClassName('caracInput'),
      namesValue = [].map.call(carac, function(dataInput){
        arrayCarac.push(dataInput.value);
      })
          
      const objetoImage = formDataInfo.get('foto');
      const urlArmada = `/images/${objetoImage.name}`
        
      const productoNuevo = {
        name: nombre.value,
        category: categoria.value,
        price: precio.value,
        caracteristicas: arrayCarac,
        imageUrl: urlArmada
      }
  
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoNuevo)
    });
  
    const data = await res.json()
  
      console.log('save')
      traer();
      //console.log(res)
  
      if (res.status !== 200) {
        console.log("hubo un error: " + res.status + data.message);
      }
  }
    await createProduct();
  
    //con este bloque estamos subiendo la imagen al backend
    /* const res = await fetch(urlUpload, {
      method: 'POST',
      body: formData
    }) */
  
  
  }



