axios({
  method: 'post',
  url: API_URL_SCHEMA.replace("{SERVICE}", "auth/verify"),
  data: {},
  headers: {
    'Authorization': 'Bearer ' + (localStorage.getItem("token_jwt_tienda") == null ? "" : localStorage.getItem("token_jwt_tienda"))
  }
}).then(async (response) => {
  let li_list_auth = document.querySelectorAll("li.perfil_auth");
  let button_list_auth = document.querySelectorAll("button.perfil_auth");
  for (let item of li_list_auth) { item.classList.remove("perfil_auth") }
  for (let item of button_list_auth) { item.classList.remove("perfil_auth") }
}).catch(async (error) => {
  let li_list_normal = document.querySelectorAll("li.perfil_normal");
  let button_list_normal = document.querySelectorAll("button.perfil_normal");
  for (let item of li_list_normal) { item.classList.remove("perfil_normal") }
  for (let item of button_list_normal) { item.classList.remove("perfil_normal") }
  location.href = "./../index.html"
});

axios({
  method: 'get',
  url: API_URL_SCHEMA.replace("{SERVICE}", "sizes"),
}).then(async (response) => {
  let acum = ""
  response.data.forEach(element => {
    const { id, nombre } = element
    acum += renderOptions(id, nombre)
  });
  document.querySelector("#lista_sizes").innerHTML = acum
}).catch(async (error) => {

});

axios({
  method: 'get',
  url: API_URL_SCHEMA.replace("{SERVICE}", "aimed_at"),
}).then(async (response) => {
  let acum = ""
  response.data.forEach(element => {
    const { id, nombre } = element
    acum += renderOptions(id, nombre)
  });
  document.querySelector("#aimed_at").innerHTML = acum
}).catch(async (error) => {

});

axios({
  method: 'get',
  url: API_URL_SCHEMA.replace("{SERVICE}", "whatsapp_information"),
}).then(async (response) => {
  let acum = ""
  response.data.forEach(element => {
    const { id, nombre } = element
    acum += renderOptions(id, nombre)
  });
  document.querySelector("#lista_whatsapp_information").innerHTML = acum
}).catch(async (error) => {

});

axios({
  method: 'get',
  url: API_URL_SCHEMA.replace("{SERVICE}", "categories"),
}).then(async (response) => {
  let acum = ""
  response.data.forEach(element => {
    const { id, nombre } = element
    acum += renderOptions(id, nombre)
  });
  document.querySelector("#lista_categorias").innerHTML = acum
}).catch(async (error) => {

});
function renderOptions(value, text) {
  return `<option value="${value}">${text}</option>`;
}

function cierre_sesion() {
  localStorage.removeItem("token_jwt_tienda");
  location.href = "./../index.html"
}


function guardar() {
  axios({
    method: 'post',
    url: API_URL_SCHEMA.replace("{SERVICE}", "products"),
    data: {
      nombre: document.querySelector("#nombre_producto").value, 
      codigo: document.querySelector("#codigo_producto").value, 
      imagen: document.querySelector("#imagen_producto").value, 
      descripcion: document.querySelector("#descripcion_producto").value, 
      cantidad: document.querySelector("#cantidad_producto").value, 
      categoria_id: document.querySelector("#lista_categorias").value, 
      talla_id: document.querySelector("#lista_sizes").value, 
      dirigido_a_id: document.querySelector("#aimed_at").value, 
      conctato_whatsapp_id: document.querySelector("#lista_whatsapp_information").value
    },
    headers: {
      'Authorization': 'Bearer ' + (localStorage.getItem("token_jwt_tienda") == null ? "" : localStorage.getItem("token_jwt_tienda"))
    }
  }).then(async (response) => {
    document.querySelector("#nombre_producto").value = ""
    document.querySelector("#codigo_producto").value =""
    document.querySelector("#cantidad_producto").value =""
    document.querySelector("#imagen_producto").value = ""
    document.querySelector("#descripcion_producto").value =""
    Swal.fire({
        title: "Se registro el producto",
        text: '',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
  }).catch(async (error) => {

  });
}