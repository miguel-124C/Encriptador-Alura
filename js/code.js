/*objetos del html*/
const form = document.querySelector(".form");
const msjUser = document.querySelector(".input-texto");
const encriptar = document.querySelector(".encriptar");
const desencriptar = document.querySelector(".desencriptar");
const resultado = document.querySelector(".mensaje");
const mensajeAlert = document.querySelector(".mensaje-alert");
const img = document.querySelector(".image-alert");
const cajaEncriptada = document.querySelector(".caja-encriptada");
const textoEncriptado = document.createElement("TEXTAREA");
textoEncriptado.classList.add("input-texto");

const botonCopiar = document.createElement("BUTTON");
botonCopiar.classList.add("btn");
botonCopiar.textContent = `Copiar`;


//funcion para ver si tiene mayuscula o minusculas
const isUpperCase = (string) => /^[A-Z]*$/.test(string);
const isLowerCase = (string) => /^[a-z]*$/.test(string);
//copia el texto de un contenido
const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(textoEncriptado.value);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
}
//variable global => almacena el texto que el usuario ingrese
var texto = "";
var leteerUper = false;
//muestra la img con mensaje de no hay mensaje 
const mostrarImgAlert=()=>{
    img.style.display = "block";
    cajaEncriptada.classList.replace("caja-flex","caja-encriptada");
    resultado.lastElementChild.textContent = "Ingresa el texto que desees encriptar o desencriptar";
}
//Solo letras minusculas y sin acentos
const mostrarMensajeAlert=(mensaje)=>{
    mensajeAlert.style.display = "block";
    mensajeAlert.lastElementChild.textContent = mensaje;
    msjUser.value=""; 
}
//muestra mensaje encriptado o desencriptado
const mostrarTextoFinal =(text)=> {
    img.style.display = "none";
    cajaEncriptada.classList.add("caja-flex");
    textoEncriptado.value = text;
    cajaEncriptada.textContent = "";
    cajaEncriptada.appendChild(textoEncriptado);  
    form.reset();
}
//Encriptar el texto
const textEncriptado =()=>{
    console.log(texto);
    let mensajeEncriptado = texto.replaceAll("e","enter").replaceAll("i","imes")
    .replaceAll("a","ai").replaceAll("o","ober").replaceAll("u","ufat");
    mostrarTextoFinal(mensajeEncriptado);
}
//Desencripta el texto
const textDesencriptado =()=>{
    let mensajeDesencriptado = texto.replaceAll("enter","e").replaceAll("imes","i")
    .replaceAll("ai","a").replaceAll("ober","o").replaceAll("ufat","u");
    mostrarTextoFinal(mensajeDesencriptado);
}

//Verifica si se puede encriptar o desencriptar. devuelve un booleano
const verificarEncriptado=()=>{
    let encriptarTexto;
    texto = msjUser.value.trim();
    if(texto == ""){
        encriptarTexto = false;
    }else{
        for(let i=0;i<texto.length;i++){
            if(isUpperCase(texto[i])){
                leteerUper = true;
                mostrarMensajeAlert("Solo escriba letras minusculas y sin acentos");
                encriptarTexto = false;
                break;
            }else{
                encriptarTexto = true;
            }
        }
    }
    console.log(encriptarTexto);
    return encriptarTexto;
}
//Encripta y desencripta depende de la funcion que le envio
const encriDesencrip =(callback)=>{
    if(verificarEncriptado()){
        callback();
        if(leteerUper) mensajeAlert.style.display = "none";
        console.log(leteerUper);
        resultado.lastElementChild.appendChild(botonCopiar);
    }else{
        mostrarImgAlert();
    };  
}
/*EVENTOS*/

//Ocurre cuando le damos al boton "encriptar"
encriptar.addEventListener("click",(e)=>{ 
    e.preventDefault();
    encriDesencrip(textEncriptado);
});
//Ocurre cuando le damos al boton "desencriptar"
desencriptar.addEventListener("click",(e)=>{
    e.preventDefault();
    encriDesencrip(textDesencriptado);
});
//Al apretar el boton copia el texto al portapapeles
botonCopiar.addEventListener("click",copyContent);

msjUser.addEventListener("keypress",(e)=>{
    e.preventDefault();
    if(e.keyCode == 32 || e.keyCode==13 || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)){
        let tecla = String.fromCharCode(e.keyCode);
        msjUser.value += tecla;
    }
});