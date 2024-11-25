
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

    mostrarLuchadores() {
        const listaLuchadores = document.getElementById("listaLuchadores");
        listaLuchadores.innerHTML = '';
        this.luchadores.forEach(fighter => {
            const li = document.createElement('li');
            li.textContent = `${fighter.nombre} - ${fighter.edad} años - ${fighter.peso} kg - ${fighter.nacionalidad}`;
            listaLuchadores.appendChild(li);
        });
    }
}


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
