
class Luchador {
    constructor(nombre, edad, peso, nacionalidad) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
        this.nacionalidad = nacionalidad;
    }
}


class Inscripcion {
    static validarLuchador(fighter) {
        if (fighter.edad < 18) {
            return "El luchador debe tener al menos 18 años.";
        }
        if (fighter.peso < 50 || fighter.peso > 150) {
            return "El peso del luchador debe estar entre 50 kg y 150 kg.";
        }
    }
}


class UFC {
    constructor() {
        this.luchadores = [];
    }

    agregarLuchador(fighter) {
        this.luchadores.push(fighter);
    }

    eliminarLuchador(indice) {
        this.luchadores.splice(indice, 1);
        this.mostrarLuchadores(); // Actualizar la lista
    }

    mostrarLuchadores() {
        const listaLuchadores = document.getElementById("listaLuchadores");
        listaLuchadores.innerHTML = '';
        this.luchadores.forEach(fighter => {
            const li = document.createElement('li');
            li.textContent = `${fighter.nombre} - ${fighter.edad} años - ${fighter.peso} kg - ${fighter.nacionalidad}`;
            listaLuchadores.appendChild(li);
        });
    }

    emparejarLuchadores() {
        const emparejamientosDiv = document.getElementById("emparejamientos");
        emparejamientosDiv.innerHTML = ''; // Limpiar resultados anteriores
        if (this.luchadores.length < 2) {
            emparejamientosDiv.innerHTML = `<p class="error">No hay suficientes luchadores para emparejar.</p>`;
            return;
        }

        const emparejamientos = [];
        const luchadoresCopia = [...this.luchadores];

        while (luchadoresCopia.length > 1) {
            const index1 = Math.floor(Math.random() * luchadoresCopia.length);
            const luchador1 = luchadoresCopia.splice(index1, 1)[0];

            const index2 = Math.floor(Math.random() * luchadoresCopia.length);
            const luchador2 = luchadoresCopia.splice(index2, 1)[0];

            emparejamientos.push(`${luchador1.nombre} vs ${luchador2.nombre}`);
        }

        if (luchadoresCopia.length === 1) {
            emparejamientosDiv.innerHTML += `<p class="error">Un luchador no tiene pareja: ${luchadoresCopia[0].nombre}</p>`;
        }

        emparejamientosDiv.innerHTML += `<h3>Emparejamientos:</h3><ul>${emparejamientos.map(p => `<li>${p}</li>`).join('')}</ul>`;
    }

}


const btnEmparejar = document.getElementById("btnEmparejar");
btnEmparejar.addEventListener("click", function () {
    ufc.emparejarLuchadores();
});
const ufc = new UFC();


const formInscripcion = document.getElementById("formInscripcion");
formInscripcion.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const nacionalidad = document.getElementById("nacionalidad").value;

    const luchador = new Luchador(nombre, edad, peso, nacionalidad);

    const mensajeError = Inscripcion.validarLuchador(luchador);
    const mensajeDiv = document.getElementById("mensaje");

    if (mensajeError) {
        mensajeDiv.innerHTML = `<p class="error">${mensajeError}</p>`;
    } else {

        ufc.agregarLuchador(luchador);
        ufc.mostrarLuchadores();
        mensajeDiv.innerHTML = `<p class="success">¡Luchador ${nombre} inscrito exitosamente!</p>`;
        formInscripcion.reset();
    }
});

const btnSimularPelea = document.getElementById("btnSimularPelea");
const resultadoPelea = document.getElementById("resultadoPelea");

btnSimularPelea.addEventListener("click", function () {
    if (ufc.luchadores.length < 2) {
        resultadoPelea.innerHTML = `<p class="error">Debe haber al menos dos luchadores para simular una pelea.</p>`;
        return;
    }

    // Seleccionar dos luchadores al azar
    const indices = seleccionarDosAleatorios(ufc.luchadores.length);
    const luchador1 = ufc.luchadores[indices[0]];
    const luchador2 = ufc.luchadores[indices[1]];

    // Decidir un ganador al azar
    const ganador = Math.random() < 0.5 ? luchador1 : luchador2;

    // Mostrar el resultado
    resultadoPelea.innerHTML = `
        <p>Pelea entre: <strong>${luchador1.nombre}</strong> y <strong>${luchador2.nombre}</strong></p>
        <p><strong>Ganador: ${ganador.nombre}</strong></p>
    `;
});

// Función para seleccionar dos índices al azar
function seleccionarDosAleatorios(max) {
    let index1 = Math.floor(Math.random() * max);
    let index2;
    do {
        index2 = Math.floor(Math.random() * max);
    } while (index1 === index2);
    return [index1, index2];
}
