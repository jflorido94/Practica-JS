
// variables globales en las cuales almacenamos:
var operadorA;      // el operador de la izquierda (o el resultado parcial, cuando concatenamos varias operaciones)
var operadorB;      // el operador de la derecha 
var operacion;      // simbolo de la operacion
var res = null;     // resultado de la operacion
var hist = null;    // la operacion completa que hemos realizado, la cual luego guardamos en el historial
var aux = null;     // la operacion parcial realizada, lo guardamos en hist cuando terminamos la operacion clicando en el =

function iniciar() {
    //variables
    var resultado = document.getElementById("resultado");   // label donde mostramos el resultado final
    var actual = document.getElementById("actual");         // label donde mostramos el numero que vamos escribiendo
    var historial = documen.getElementById("historial")     // textarea donde mostramos todo el historial de las operaciones realizadas

}

// funciones que se realizan al pulsar una tecla de operacion (+,-,*,/,%,^,v)
function suma() {
    if (operadorA == null) {                        //si operadorA esta vacio guardamos el numero actual en dicho operador
        operadorA = Number(actual.textContent);     //
        operacion = "+";                            //y iniciamos el operador a +
        limpiarActual();                            //limpiamos el label donde escribimos el numero, listo para escribir el siguiente numero
    } else {
        resolver("+");                              //si OperadorA ya tiene un numero llamamos a la funcion resolver, pasando por parametro el +
    }
}
function resta() {
    if (operadorA == null) {
        operadorA = Number(actual.textContent);
        operacion = "-";
        limpiarActual();
    } else {
        resolver("-");
    }
}
function multiplicacion() {
    if (operadorA == null) {
        operadorA = Number(actual.textContent);
        operacion = "*";
        limpiarActual();
    } else {
        resolver("*");
    }
}
function division() {
    if (operadorA == null) {
        operadorA = Number(actual.textContent);
        operacion = "/";
        limpiarActual();
    } else {
        resolver("/");
    }
}
function porcentaje() {
    if (operadorA == null) {
        operadorA = Number(actual.textContent);
        operacion = "%";
        limpiarActual();
    } else {
        resolver("%");
    }
}
function cuadrado() {
    if (operadorA == null) {
        operadorA = Number(actual.textContent);
        operacion = "^";
        limpiarActual();
    } else {
        resolver("^");
    }
}
function raiz() {
    if (operadorA == null) {
        operadorA = Number(actual.textContent);
        operacion = "√";
        limpiarActual();
    } else {
        resolver("√");
    }
}
//Al clicar en el boton +- multiplicamos por -1 el numero que estemos actualmente editando para cambiar su simbolo
function cambio() {
    let aux = Number(actual.textContent)
    actual.textContent = (-1 * aux).toString();
}
// tecla 1/x divide 1 entre el numero actual para obtener la fraccion
function fraccion() {
    let aux = Number(actual.textContent)
    actual.textContent = (1 / aux).toString();
}
// llama al metodo resolver pasando el parametro =, asi finaliza la operacion
function igual() {
    resolver("=");
}
//añade un punto al label actual, solo si no existe ningun punto
function punto() {
    if (!actual.textContent.includes(".")) {
        actual.textContent = actual.textContent + ".";
    }
}

//Al teclear numero los añadimos al label actual
function add(tecla) {
    if (actual.textContent == "0") {                        //si solo tenemos el numero 0, "borramos" ese 0 y colocamos el numero que hemos pulsado
        actual.textContent = tecla;
    } else {
        actual.textContent = actual.textContent + tecla;    //si no es igual a 0 concatenamos el numero pulsado
    }
}
//Borramos el ultimo numero del label actual
function borrar() {
    if (actual.textContent.length == 1) {                       //si solo queda un caracter, limpiamos el label actual
        limpiarActual();
    } else {
        actual.textContent = actual.textContent.slice(0, -1);   //si es hay mas de un caracter se borra el ultimo
    }
}
//limpiamos el label actual igualandolo a 0
function limpiarActual() {
    actual.textContent = "0";
}
//ponemos todos las variables a null y limpiamos el label actual
function resetear() {
    limpiarActual()
    operadorA = null;
    operadorB = null;
    operacion = null;
    res = null;
    hist = null;
    aux = null;
}
//Funcion para redondear a unos decimales
function redondeo(numero, decimales)
{
var flotante = parseFloat(numero);
var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
return resultado;
}

//este metodo se llama al pulsar cualquier operacion (+,-,*,/,%,^,v)
function resolver(metodo) {
    operadorB = Number(actual.textContent);                         //guardamos el numero de label actual en el operadorB
    if (metodo == "=") {                                            //si el metodo que le pasamos por parametro es =, por lo que terminaremos la operacion
        
        switch (operacion) {                                        //segun la operacion realizamos una operacion u otra
            case "+":
                res = operadorA + operadorB;
                break;
            case "-":
                res = operadorA - operadorB;
                break;
            case "*":
                res = operadorA * operadorB;
                break;
            case "/":
                res = operadorA / operadorB;
                break;
            case "%":
                res = operadorA * operadorB / 100;                  //el porcentaje lo realizo multiplicando los operadores y dividiendo entre 100
                break;
            case "^":
                res = Math.pow(operadorA, operadorB);
                break;
            case "√":
                res = Math.pow(operadorA, (1 / operadorB));
                break;
            default:
                break;
        }
        resultado.textContent = redondeo(res,6);                    //en el label resultado mostramos el resultado redondeado que nos a dado en la operacion
        addhistorial(metodo);                                       //llamamos a añadir historial pasandole por parametro el metodo(=)
        resetear();                                                 //llamamos al metodo resetear
    } else {                                                        //si es un metodo distinto a =, por lo que vamos a seguir haciendo operaciones con ese numero
        switch (operacion) {                                        //realizamos la operacion segun la anterior tecla de operacion pulsada
            case "+":
                res = operadorA + operadorB;
                break;
            case "-":
                res = operadorA - operadorB;
                break;
            case "*":
                res = operadorA * operadorB;
                break;
            case "/":
                res = operadorA / operadorB;
                break;
            case "%":
                res = operadorA * operadorB / 100;
                break;
            case "^":
                res = Math.pow(operadorA, operadorB);
                break;
            case "√":
                res = Math.pow(operadorA, (1 / operadorB));
                break;
            default:
                break;
        }
        limpiarActual();                                            //limpiamos el actual
        addhistorial(metodo);                                       //llamamos a añadir historial pasandole el metodo pulsado, en este caso +,-,* etc
        operacion = metodo;                                         //igualamos operacion a metodo y
        operadorA = redondeo(res,6);                                //operadorA al res redondeado para seguir usandolo en las proximas operaciones
    }
}
//este metodo lo usamos para confeccionar el historial de las operaciones realizadas
function addhistorial(metodo) {
    if (metodo == "=") {                                                    //si el metodo recibido es =, termina la operacion
        if (operacion=="√") {
            if (aux == null) {
                hist = operadorB + operacion + "(" + operadorA + ")"+ metodo + redondeo(res,6); 
            } else { 
                hist = operadorB + operacion +"(" +aux +")" + metodo + redondeo(res,6);                
            }
        } else {
            if (aux == null) {                                                  //y aux no tiene ningun valor aun (no se a realizado ninguna operacion previa, es una operacion simple)
                hist = operadorA + operacion + operadorB + metodo + redondeo(res,6);          
            } else {                                                            //si aux tiene valor (por lo que es una operacion compuesta, ya se han introducido mas de 2 operadores)
                hist = aux + operacion + operadorB + metodo + redondeo(res,6);                
            }
        }                                                  
        
        historial.textContent = hist + "\n" + historial.textContent         //agregamos al principio del textarea la operacion realizada con todos sus operandos, operadores y resultado
    } else {                                                                //no es el fin de una operacion
        if (operacion=="√") {
            if (aux == null) {                                                          //si aux no tiene ningun valor aun (es el principio de una operacion compuesta)
                aux = operadorB + operacion +"(" + operadorA +")"                         
            } else {                                                                    //si ya se ha comenzado a realizar la operacion, seguimos concatenando la operacion mas el operador nuevo
                aux = operadorB + operacion +"(" + aux +")"
            }
        } else {                                                                        //no es el fin de una operacion
            if (aux == null) {                                                          //si aux no tiene ningun valor aun (es el principio de una operacion compuesta)
                aux = operadorA + operacion + operadorB                         
            } else {                                                                    //si ya se ha comenzado a realizar la operacion, seguimos concatenando la operacion mas el operador nuevo
                aux = aux + operacion + operadorB
            }
        }
    }
}
