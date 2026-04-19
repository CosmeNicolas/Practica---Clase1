/* 1 Declara una variable edad y muestra por consola "Es mayor de edad" si es mayor o igual a 18*/
let edad = 19;
if (edad >= 18) {
  console.log("Es mayor de edad👮🏼");
} else {
  console.log("Es menor de edad 👶🏼");
}

/* 2 Declara una variable numero y muestra por consola "Es positivo" si es mayor que 0, "Es negativo" si es menor que 0, o "Es cero" si es igual a 0*/
let nota = 7;
if (nota >= 6) {
  console.log("Aprobado✅");
} else {
  console.log("Desaprobado❌");
}

/* 3 Declara una variable usuario y passwor. Si el usuario es "admin" y el password es "1234", muestra por consola "Acceso concedido". De lo contrario, muestra "Acceso denegado".*/

let usuario = "admin";
let password = "1234";
if (usuario === "admin" && password === "1234") {
  console.log("Acceso concedido💪🏼");
} else {
  console.log("Acceso denegado");
}

/* 4 Declara una variable numero y usa el operador ternario para mostrar "Par" si es par o "impar" si es impar */

let numero = [1, 2, 3, 4, 5,6,7,8,9,10];
let resultado = numero.map(num => num % 2 === 0 ? "Par" : "Impar");
console.log(resultado);

/* 5 Declara una variable dia (numero del 1 al 3) y usa switch para mostrar " Lunes", "Martes" o "Miercoles" segun corresponda. Si no es ninguno valores, muestra "Otro día"
*/

let dia = [1, 2, 3];
switch (dia=1) {
  case 1:
    console.log("lunes");
    break;
  case 2:    
  console.log("Martes");
    break;
  case 3:
    console.log("Miercoles"); 
    break;
  default:
    console.log("Otro día");
    break;
}

/*Declara una variable edad y otra variable esMayor que sea true si la edad es mayor o igual a 18, o false en caso contrario. Muestra el valor de esMayor por consola.*/

let edades = 20;
let esMayor = edades >= 18 ? true : false;
console.log(esMayor);


/* ARRAYS 
EJERCICIO 1 
Crea un array llamado frutas con los valores "manzana", "banana" y "pera". Cambia el valor "banana" por "naranja" y muestra el array por consola. */

let frutas = ["manzana", "banana", "pera"]; /* o sea manzana es 0, banana es 1 y pera es 2 */
frutas [1] = "naranja";
console.log(frutas);

/* EJERCICIO 2
Crea un array numeros con los valores 1, 2 y 3. Agrega el número 4 al final y luego elimina el último elemento. Muestra el array final por consola. */
let numeros = [1, 2, 3];
numeros.push(4); 
numeros.pop(); 
console.log(numeros); 

/* EJERCICIO 3
Crea dos arrays: animales1 con "perro" y "gato", y animales2 con "loro" y "pez". Une ambos arrays en uno solo llamado animales y muéstralo por consola.*/

let animales1 = ["perro", "gato"];
let animales2 = ["loro", "pez"];
let animales = animales1.concat(animales2); /* Une ambos arrays en uno solo llamado animales */
console.log(animales); /* Muestra el array animales por consola */

/* EJERCICIO 4
Crea un array numeros con los valores 1, 2, 3, 4, 5. Usa un método para invertir el orden de los elementos y muestra el resultado por consola.*/

let numeross = [1, 2, 3, 4, 5];
numeross.reverse(); /* Invierte el orden de los elementos del array */
console.log(numeross); /* Muestra el array con el orden invertido por consola */

/* EJERCICIO 5
Crea un array colores con "rojo", "verde", "azul", "amarillo", "violeta". Usa slice para obtener un nuevo array con los elementos del índice 1 al 3 (sin incluir el 3) y muéstralo por consola.*/

let colores = ["rojo", "verde", "azul", "amarillo", "violeta"];
let coloresSeleccionados = colores.slice(1, 3); /* Usa slice para obtener un nuevo array con los elementos del índice 1 al 3 (sin incluir el 3) o sea se detiene justo antes del 3, toma el 1 y el 2 */
console.log(coloresSeleccionados); 

/* EJERCICIO 6
Crea un array edades con los valores 10, 15, 20, 25. Usa map para crear un nuevo array llamado mayores que contenga true si la edad es mayor o igual a 18, y false si no. Muestra el resultado por consola.*/

let edadess = [10, 15, 20, 25];
let mayores = edadess.map(edad => edad >= 18 ? true : false); 
console.log(mayores);

/* EJERCICIO 7
Crea un array numeros con los valores 2, 4, 6, 8. Usa forEach para mostrar el doble de cada número por consola.*/

let numerosss = [2, 4, 6, 8];
numerosss.forEach(numeros => console.log(numeros * 2)); 


