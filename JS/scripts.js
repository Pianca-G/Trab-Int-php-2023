console.log(document.getElementById("descuento").value);
//===============Declaracion de variables===================
const formulario_modal = document.getElementById("formulario_modal");
const inputs = document.querySelectorAll("#formulario_modal input");
const btn_resumen = document.getElementById("btn_resumen");
let precioVenta =0;
let precioUnitario=200;
let descuento =0;
// Dentro de la constante expresiones defino como se van validar los distintos inmputs y le asigno un nombre
// de manera que quede expresiones.nombre
//                                .apellido
//                                .correo 
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,15}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,35}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}


//==================Eventos Listener========================
//  btn_resumen.addEventListener("click",valido_todo ) //valida los ingresos de los inputs y la suma con los descuentos
inputs.forEach((input) => {
    input.addEventListener('keyup', valido_txt);// se ejecuta cada vez que se suelta una tecla
    input.addEventListener('blur', valido_txt);// se ejecuta cada vez que hace click fuera del input
    input.addEventListener('click', valido_txt);// lo voy a usar principalmente para el input de cantidad
})
document.getElementById("descuento").addEventListener('keyup', CostoTickets);
document.getElementById("descuento").addEventListener('click', CostoTickets);
//=====================Funciones============================
// VALIDAMOS LOS INPUTS
function valido_txt(e) {
    
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
            break;
        case "mail":
            validarCampo(expresiones.correo, e.target, "mail");
            break;
        case "cantidad":
            
            validoCantTkts();
            CostoTickets();
            break;
    }
}
function CostoTickets() {
     //console.log(document.querySelector('#descuento').value)
    switch (document.querySelector('#descuento').value) {
        case "Entrada gral":
            descuento=0
            break;
        case "Estudiante":
            descuento=0.8
            break;
        case "Trainee":
            descuento=0.50
            break;
        case "Junior":
            descuento=0.15
            break;
    }
    console.log (descuento);
    console.log(precioVenta)
   precioVenta= document.querySelector('#cantidad').value * precioUnitario;
   precioVenta= precioVenta- (precioVenta * descuento)
   precioVenta= precioVenta.toFixed(2)
   document.querySelector('#saldo').value=("Total a pagar: $ " + precioVenta);
   //Multiplico por el residuo del descuento 
}
function validoCantTkts() {
    if (document.querySelector('#cantidad').value < 0 || document.querySelector('#cantidad').value > 5) {
        document.querySelector('#cantidad').value = 0
        document.querySelector('#cantidad').onFocus = document.querySelector('#cantidad')
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.querySelector(`#${campo}`).classList.add("is-valid");
        document.querySelector(`#${campo}`).classList.remove("is-invalid");
        document.querySelector(`#grupo_${campo} .msjError`).classList.add("d-none");
        // campos[campo] = true ;
    } else {
        document.querySelector(`#${campo}`).classList.add("is-invalid");
        document.querySelector(`#${campo}`).classList.remove("is-valid");
        document.querySelector(`#grupo_${campo} .msjError`).classList.remove("d-none");
        // campos[campo] = false ;
    }
}

