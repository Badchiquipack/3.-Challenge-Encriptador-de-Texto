const d = document;
const textArea = d.querySelector(".main_encriptar_texto");
const imagenMuneco = d.querySelector(".main_muneco");
const primerMensaje = d.querySelector(".main_mensaje_uno");
const segundoMensaje = d.querySelector(".main_mensaje_dos");
const botonEncriptar = d.querySelector(".btn_encriptar");
const botonDesencriptar = d.querySelector(".btn_desencriptar");
const botonCopiar = d.querySelector(".btn_copiar");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada
    }
    return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

textArea.addEventListener("input", (e) => {
    imagenMuneco.style.display = "none";
    primerMensaje.textContent = "Capturando Mensaje";
    segundoMensaje.textContent = "";
});

botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    segundoMensaje.textContent = mensajeEncriptado;
    botonCopiar.removeAttribute("hidden");
    botonCopiar.style.display = "block";
    primerMensaje.textContent = "El resultado es: "
});

botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    segundoMensaje.textContent = mensajeDesencriptado;
    primerMensaje.textContent = "Mensaje desencriptado:"
});

botonCopiar.addEventListener("click", () => {
    let textoCopiado = segundoMensaje.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        imagenMuneco.style.display = "block";
        primerMensaje.textContent = "Texto copiado:"
        botonCopiar.style.display = "none";
    });
});