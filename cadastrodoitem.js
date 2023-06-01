const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const btn = document.getElementById("btn");
const foto = document.getElementById("foto");

var url = new URL (window.location.href);
var peditar = url.searchParams.get ("peditar");
var pindice = url.searchParams.get ("indice");
var emaillogado;
femailLogado();

if (peditar == "true"){
  editar(pindice);
}


btn.onclick =(evento)=>{

if((peditar != "true") || (peditar == null)){


  evento.preventDefault();
    fenvio()
    .then(result => {
        if(result){

        let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
        dados.push(
    {
        nome : nome.value,
        descricao : descricao.value,
        foto : nomeArq,
        email: emaillogado
    }
    )
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.assign("index5.html")
    }
    else{
        alert("houve erro no envio do arquivo");
    }
    });

  }else{
    editarenvio(evento);
    
  }
}


function editar (indice){
  nome.value = "";
  descricao.value = "";
  foto.files[0]=null;
  let dados = JSON.parse(localStorage.getItem("catalogo"))
  nome.value = dados[indice].nome;
  descricao.value = dados[indice].descricao;
  fotoa= dados[indice].foto;
}


var nomeArq;
async function fenvio() { 
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData.values[0]));
    console.log(JSON.stringify(formData.values[1]));
    try{
         
         var resp = await fetch(url, {
                                       method: 'POST',
                                       body: formData,
                                     }
                               ) 
         console.log(resp);
         if (resp.ok){
           let respText = await resp.text();
           nomeArq = respText;
           return true;
         }
         else{
              return false;
         }
       }
    catch (error) {
        console.error(error);
        return false;
      }
}

var fotoa;
function editarenvio(evento){
 
 
 if ((fotoa != foto.value)&&(foto.value != "")){
  evento.preventDefault();
 fenvio()
 .then(result =>{
                 if(result){
                   salvarEdicao(nomeArq);
                    }
                 });
}
else
{
     salvarEdicao(fotoa);
} 
}

function salvarEdicao(pfoto){
  let dados = JSON.parse(localStorage.getItem("catalogo"));
  dados[pindice].nome = nome.value;
  dados[pindice].descricao = descricao.value;
  dados[pindice].foto = pfoto;
  dados[pindice].email = emaillogado;
  
  localStorage.setItem("catalogo", JSON.stringify(dados));
  window.location.assign("index5.html");
}

function femailLogado(){
  let dados = sessionStorage.getItem("logado");
  if(dados == null){
      window.location.assign("index3.html");
  }else{
      emaillogado = dados;
  }
}