// script.js

const tareas = [
  { id: 1, descripcion: "Completar curso de HTML", completada: false },
  { id: 2, descripcion: "Hacer compra en el supermercado", completada: false },
  { id: 3, descripcion: "Terminar proyecto de diseño", completada: true },
];

const totalTareasElement = document.getElementById("total-tareas");
const totalTareasCompletadasElement = document.getElementById(
  "total-tareas-completadas"
);
const tareasElement = document.getElementById("tareas");
const agregarTareaForm = document.getElementById("agregar-tarea");
const nuevaTareaInput = document.getElementById("nueva-tarea");

// Función para actualizar el resumen de tareas
function actualizarResumen() {
  const totalTareas = tareas.length;
  const totalTareasCompletadas = tareas.filter((tarea) => tarea.completada).length;

  totalTareasElement.textContent = totalTareas;
  totalTareasCompletadasElement.textContent = totalTareasCompletadas;
}

// Función para actualizar la lista de tareas
function actualizarListaTareas() {
  tareasElement.innerHTML = ""; // Limpiar la lista existente

  tareas.forEach((tarea) => {
    const tareaElement = document.createElement("li");
    tareaElement.id = tarea.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;
    checkbox.addEventListener("change", () => {
      tarea.completada = checkbox.checked;
      actualizarResumen();
    });

    const descripcionElement = document.createElement("span");
    descripcionElement.textContent = tarea.descripcion;

    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.addEventListener("click", () => {
      const indiceTarea = tareas.findIndex((t) => t.id === tarea.id);
      tareas.splice(indiceTarea, 1);
      actualizarResumen();
      actualizarListaTareas();
    });

    tareaElement.appendChild(checkbox);
    tareaElement.appendChild(descripcionElement);
    tareaElement.appendChild(eliminarButton);

    if (tarea.completada) {
      tareaElement.classList.add("completada");
    }

    tareasElement.appendChild(tareaElement);
  });
}

// Agregar una nueva tarea
agregarTareaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nuevaDescripcion = nuevaTareaInput.value.trim();

  if (nuevaDescripcion) {
    const nuevaTarea = {
      id: generarId(),
      descripcion: nuevaDescripcion,
      completada: false,
    };

    tareas.push(nuevaTarea);
    actualizarResumen();
    actualizarListaTareas();
    nuevaTareaInput.value = ""; // Limpiar el input
  }
});

// Generar un ID único para cada tarea
function generarId() {
  let id = 1;
  return tareas.reduce((maxId, tarea) => (tarea.id > maxId ? tarea.id : maxId), id) + 1;
}

// Inicializar la página
actualizarResumen();
actualizarListaTareas();
