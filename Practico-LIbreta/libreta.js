const nombreAlumnoInput = document.getElementById("nombreAlumno");
const materiaInput = document.getElementById("materia");
const nota1Input = document.getElementById("nota1");
const nota2Input = document.getElementById("nota2");

const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");

const alumnoMostrado = document.getElementById("alumnoMostrado");
const tablaMaterias = document.getElementById("tablaMaterias");
const mensajeVacio = document.getElementById("mensajeVacio");

let libreta = {
  alumno: "",
  materias: []
};

document.addEventListener("DOMContentLoaded", cargarDesdeLocalStorage);

btnAgregar.addEventListener("click", agregarMateria);
btnLimpiar.addEventListener("click", limpiarLibreta);

function agregarMateria() {
  const nombreAlumno = nombreAlumnoInput.value.trim();
  const materia = materiaInput.value.trim();
  const nota1 = Number(nota1Input.value);
  const nota2 = Number(nota2Input.value);

  if (nombreAlumno === "" || materia === "" || nota1Input.value === "" || nota2Input.value === "") {
    alert("Completa todos los campos.");
    return;
  }

  if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
    alert("Las notas deben estar entre 0 y 10.");
    return;
  }

  const promedio = (nota1 + nota2) / 2;

  const nuevaMateria = {
    materia,
    nota1,
    nota2,
    promedio,
    estado: promedio >= 6 ? "Aprobado" : "Desaprobado"
  };

  libreta.alumno = nombreAlumno;
  libreta.materias.push(nuevaMateria);

  guardarEnLocalStorage();
  mostrarLibreta();
  limpiarInputsMateria();
}

function mostrarLibreta() {
  tablaMaterias.innerHTML = "";

  if (libreta.alumno) {
    alumnoMostrado.textContent = libreta.alumno;
    alumnoMostrado.classList.remove("alumno-vacio");
  } else {
    alumnoMostrado.textContent = "Todavía no se cargó un alumno";
    alumnoMostrado.classList.add("alumno-vacio");
  }

  if (libreta.materias.length === 0) {
    mensajeVacio.style.display = "block";
    return;
  }

  mensajeVacio.style.display = "none";

  libreta.materias.forEach((item) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${item.materia}</td>
      <td>${item.nota1}</td>
      <td>${item.nota2}</td>
      <td>${item.promedio.toFixed(2)}</td>
      <td class="${item.estado === "Aprobado" ? "aprobado" : "desaprobado"}">
        ${item.estado}
      </td>
    `;

    tablaMaterias.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("libretaUniversitaria", JSON.stringify(libreta));
}

function cargarDesdeLocalStorage() {
  const datosGuardados = localStorage.getItem("libretaUniversitaria");

  if (datosGuardados) {
    libreta = JSON.parse(datosGuardados);

    nombreAlumnoInput.value = libreta.alumno;
  }

  mostrarLibreta();
}

function limpiarInputsMateria() {
  materiaInput.value = "";
  nota1Input.value = "";
  nota2Input.value = "";
  materiaInput.focus();
}

function limpiarLibreta() {
  const confirmar = confirm("¿Seguro que quieres limpiar toda la libreta?");

  if (!confirmar) return;

  libreta = {
    alumno: "",
    materias: []
  };

  localStorage.removeItem("libretaUniversitaria");

  nombreAlumnoInput.value = "";
  materiaInput.value = "";
  nota1Input.value = "";
  nota2Input.value = "";

  mostrarLibreta();
}