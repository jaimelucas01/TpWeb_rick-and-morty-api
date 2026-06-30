// ===============================
// BOTONES
// ===============================
const btnTodos = document.getElementById("btnTodos");
const btnBuscar = document.getElementById("btnBuscar");

// ===============================
// INPUTS
// ===============================
const inputName = document.getElementById("name");
const inputStatus = document.getElementById("status");
const inputSpecies = document.getElementById("species");
const inputType = document.getElementById("type");
const inputGender = document.getElementById("gender");

// ===============================
// CONTENEDOR DE RESULTADOS
// ===============================
const resultado = document.getElementById("resultado");

// ===============================
// TRADUCCIONES PARA MOSTRAR DATOS
// ===============================

function traducirEstado(estado) {

    switch (estado.toLowerCase()) {

        case "alive":
            return "Vivo";

        case "dead":
            return "Muerto";

        default:
            return "Desconocido";

    }

}

function traducirGenero(genero) {

    switch (genero.toLowerCase()) {

        case "male":
            return "Masculino";

        case "female":
            return "Femenino";

        case "genderless":
            return "Sin género";

        default:
            return "Desconocido";

    }

}

function traducirEspecie(especie) {

    switch (especie.toLowerCase()) {

        case "human":
            return "Humano";

        case "alien":
            return "Alienígena";

        case "robot":
            return "Robot";

        case "humanoid":
            return "Humanoide";

        case "animal":
            return "Animal";

        case "disease":
            return "Enfermedad";

        default:
            return especie;

    }

}

// ===============================
// TRADUCCIONES PARA BUSCAR
// (Español -> Inglés)
// ===============================

function traducirEstadoBusqueda(estado) {

    switch (estado.toLowerCase()) {

        case "vivo":
            return "alive";

        case "muerto":
            return "dead";

        case "desconocido":
            return "unknown";

        default:
            return estado.toLowerCase();

    }

}

function traducirGeneroBusqueda(genero) {

    switch (genero.toLowerCase()) {

        case "masculino":
            return "male";

        case "femenino":
            return "female";

        case "sin género":
        case "sin genero":
            return "genderless";

        case "desconocido":
            return "unknown";

        default:
            return genero.toLowerCase();

    }

}

function traducirEspecieBusqueda(especie) {

    switch (especie.toLowerCase()) {

        case "humano":
            return "human";

        case "alienígena":
        case "alienigena":
            return "alien";

        case "robot":
            return "robot";

        case "humanoide":
            return "humanoid";

        case "animal":
            return "animal";

        case "enfermedad":
            return "disease";

        default:
            return especie;

    }

}

// ===============================
// MOSTRAR PERSONAJES
// ===============================

function mostrarPersonajes(personajes) {

    resultado.innerHTML = "";

    personajes.forEach(personaje => {

        resultado.innerHTML += `

        <div class="card">

            <img src="${personaje.image}" alt="${personaje.name}">

            <h2>${personaje.name}</h2>

            <p><strong>Estado:</strong> ${traducirEstado(personaje.status)}</p>

            <p><strong>Especie:</strong> ${traducirEspecie(personaje.species)}</p>

            <p><strong>Tipo:</strong> ${personaje.type || "Sin especificar"}</p>

            <p><strong>Género:</strong> ${traducirGenero(personaje.gender)}</p>

        </div>

        `;

    });

}

// ===============================
// OBTENER PERSONAJES
// ===============================

async function obtenerPersonajes(url) {

    try {

        resultado.innerHTML = "<h2>Cargando...</h2>";

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se encontraron personajes.");
        }

        const datos = await respuesta.json();

        mostrarPersonajes(datos.results);

    }
    catch (error) {

        resultado.innerHTML = `
            <h2>${error.message}</h2>
        `;

    }

}

// ===============================
// BOTÓN OBTENER TODOS
// ===============================

btnTodos.addEventListener("click", () => {

    obtenerPersonajes("https://rickandmortyapi.com/api/character");

});

// ===============================
// BOTÓN BUSCAR
// ===============================

btnBuscar.addEventListener("click", () => {

    let url = "https://rickandmortyapi.com/api/character/?";

    if (inputName.value.trim() !== "") {
        url += `name=${encodeURIComponent(inputName.value.trim())}&`;
    }

    if (inputStatus.value.trim() !== "") {
        url += `status=${traducirEstadoBusqueda(inputStatus.value.trim())}&`;
    }

    if (inputSpecies.value.trim() !== "") {
        url += `species=${traducirEspecieBusqueda(inputSpecies.value.trim())}&`;
    }

    if (inputType.value.trim() !== "") {
        url += `type=${encodeURIComponent(inputType.value.trim())}&`;
    }

    if (inputGender.value.trim() !== "") {
        url += `gender=${traducirGeneroBusqueda(inputGender.value.trim())}&`;
    }

    obtenerPersonajes(url);

});