const msg = document.querySelector(".mensagem");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarsenha = document.getElementById("confirmarsenha");

formulario.onsubmit = (evt) => { 
    let dados = JSON.parse(localStorage.getItem("bd"));
    dados.forEach((elemento) => {
        if (elemento.email == email.value && elemento.senha == senha.value){
            msg.innerHTML = "aguarde redirecionando..."
            evt.preventdefault();
            setTimeout(()=>{
                window.location.assign("catalogo.html");
            },2000);
            return true;
        } else {
            msg.innerHTML = "usuario ou senhas incorretos!";
            evt.preventdefault();
            return null;
        }
    });
}