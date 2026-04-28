// Array para almacenar alumnos
let alumnos = [];

const formulario = document.getElementById("alumnoForm");
const tablaBody = document.getElementById("tablaBody");
const tabButtons = document.querySelectorAll(".tab-btn");

// Calcular promedio
const calcularPromedio = (alumno) => {
  if (!alumno.notas || alumno.notas.length === 0) return 0;
  const suma = alumno.notas.reduce((acc, nota) => acc + nota, 0);
  return suma / alumno.notas.length;
};

// Obtener condición
const obtenerCondicion = (alumno) => {
  const promedio = calcularPromedio(alumno);
  return promedio >= 6 ? "Aprobado" : "Desaprobado";
};

// Mostramos los alumnos en la tabla
const renderAlumnos = (filter = "all") => {
  if (!tablaBody) return;
  tablaBody.innerHTML = "";

  // ordenar alfabeticamente pro nombre 
  const sorted = [...alumnos].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
  );

  const filtered = sorted.filter((a) => {
    const cond = obtenerCondicion(a);
    if (filter === "aprobados") return cond === "Aprobado";
    if (filter === "desaprobados") return cond === "Desaprobado";
    return true;
  });

  filtered.forEach((alumno) => {
    const tr = document.createElement("tr");

    const promedio = calcularPromedio(alumno);
    const condicion = obtenerCondicion(alumno);

    const tdNombre = document.createElement("td");
    tdNombre.textContent = alumno.nombre;
    tr.appendChild(tdNombre);

    const tdEdad = document.createElement("td");
    tdEdad.textContent = alumno.edad;
    tr.appendChild(tdEdad);

    const tdNotas = document.createElement("td");
    tdNotas.textContent = alumno.notas.join(", ");
    tr.appendChild(tdNotas);

    const tdAsis = document.createElement("td");
    tdAsis.textContent = (alumno.asistencia || 0) + "%";
    tr.appendChild(tdAsis);

    const tdProm = document.createElement("td");
    tdProm.textContent = promedio.toFixed(2);
    tr.appendChild(tdProm);

    const tdCond = document.createElement("td");
    tdCond.textContent = condicion;
    tr.appendChild(tdCond);

    tablaBody.appendChild(tr);
  });

  actualizarEstadoGeneral();
};

// Evento submit del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = Number(document.getElementById("edad").value);
  const notasInput = document.getElementById("notas").value;
  const asistencia = Number(document.getElementById("asistencia").value);

  const notas = notasInput
    .split(",")
    .map((nota) => Number(nota.trim())) // map ✅
    .filter((nota) => !isNaN(nota) && nota >= 0 && nota <= 10); // filter ✅

  const alumno = { nombre, edad, notas, asistencia };
  alumnos.push(alumno);

  renderAlumnos();

  formulario.reset();
});

/* Sección 4 – Métodos de Arrays (uso obligatorio)
• map para convertir las notas ingresadas a números
• filter para eliminar notas inválidas
• reduce para calcular promedios
• find para buscar alumnos por nombre
• some para verificar si hay alumnos desaprobados
• every para verificar si todos aprobaron*/

const btnBuscar = document.getElementById("btnBuscar");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");

btnBuscar.addEventListener("click", () => {
  const nombreBuscado = document
    .getElementById("buscarNombre")
    .value.toLowerCase();

  const alumno = alumnos.find((a) => a.nombre.toLowerCase() === nombreBuscado); // find ✅

  if (alumno) {
    resultadoBusqueda.textContent = `Encontrado: ${alumno.nombre}`;
  } else {
    resultadoBusqueda.textContent = "Alumno no encontrado";
  }
});

// Actualiza información general usando some y every
const actualizarEstadoGeneral = () => {
  const estadoEl = document.getElementById("estadoGeneral");
  if (!estadoEl) return;

  if (alumnos.length === 0) {
    estadoEl.textContent = "No hay alumnos cargados.";
    return;
  }

  const hayDesaprobados = alumnos.some(
    (a) => obtenerCondicion(a) === "Desaprobado",
  ); // some ✅

  const todosAprobados = alumnos.every(
    (a) => obtenerCondicion(a) === "Aprobado",
  ); 
  // Promedio general de la materia
  const totalProm =
    alumnos.reduce((acc, a) => acc + calcularPromedio(a), 0) / alumnos.length;

  let estadoText = "";
  if (todosAprobados) {
    estadoText = "Todos los alumnos aprobaron.";
  } else if (hayDesaprobados) {
    estadoText = "Hay alumnos desaprobados.";
  } else {
    estadoText = "Estado mixto de aprobaciones.";
  }

  estadoEl.textContent = `${estadoText} Promedio general: ${totalProm.toFixed(2)}`;
};

// Tabs: filtrar por condición
if (tabButtons && tabButtons.length) {
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      renderAlumnos(filter);
      // marcar activo
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  // activar tab 'Todos' por defecto
  const defaultTab = document.querySelector('.tab-btn[data-filter="all"]');
  if (defaultTab) defaultTab.classList.add("active");
}


localStorage.setItem("alumnos", JSON.stringify(alumnos));

const alumnosGuardados = localStorage.getItem("alumnos");
if (alumnosGuardados) {
  alumnos = JSON.parse(alumnosGuardados);
}

console.log("Alumnos cargados desde localStorage:", alumnos);
renderAlumnos();


