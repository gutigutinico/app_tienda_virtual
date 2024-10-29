axios({
    method: 'post',
    url: API_URL_SCHEMA.replace("{SERVICE}", "auth/verify"),
    data: {},
    headers:{
        'Authorization': 'Bearer ' + (localStorage.getItem("token_jwt_tienda") == null?"":localStorage.getItem("token_jwt_tienda"))
    }
  }).then((response) => {
    location.href = ROOT_DIR+"index.html"
  }).catch(function (error) {
});

document.querySelector("#ingresar").addEventListener("click", () => {
    axios({
        method: 'post',
        url: API_URL_SCHEMA.replace("{SERVICE}", "auth/login"),
        data: {
            email: document.querySelector("#usuario").value,
            password: document.querySelector("#clave").value
        }
    }).then((response) => {
        localStorage.setItem("token_jwt_tienda", response.data.data.access_token)
        location.href = ROOT_DIR+"index.html";
    }).catch(function (error) {
        console.log(error)
        try {
            if (error.response.data.message !== undefined) {
                Swal.fire({
                    title: error.response.data.message,
                    text: '',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
            }
        } catch (error_) { }
    });
})