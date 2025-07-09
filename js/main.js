/* localStorage para poner el nombre de tu entrenador */ 
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("nombreInput");
  const boton = document.getElementById("guardarBtn");
  const mensaje = document.getElementById("bienvenida");

  
  const nombreGuardado = localStorage.getItem("entrenador");
  if (nombreGuardado) {
    mensaje.textContent = `¡Bienvenido de nuevo, ${nombreGuardado}!`;
  }

  boton.addEventListener("click", () => {
    const nombre = input.value.trim();

    if (nombre) {
      localStorage.setItem("entrenador", nombre);
      mensaje.textContent = `¡Bienvenido entrenador, ${nombre}!`;
      input.value = "";
    } else {
      mensaje.textContent = "Por favor, ingresá tu nombre.";
    }
  });
});

/* OBJETOS PARA SELECCIONAR TUS POKEMONES */
const pokemones = {
  pikachu: {
    nombre: "Pikachu",
    imagen: "img/pikachu.png",
    ataques: [
      { nombre: "Arañazo" , min:5, max: 10},
      { nombre: "Impactrueno" , min:8, max: 14},
      { nombre: "Rayo" , min:12, max: 20},
    ]
   },
  charmander: {
    nombre: "Charmander",
    imagen: "img/charmander1.png",
    ataques: [
      { nombre: "Arañazo" , min:5, max: 10},
      { nombre: "Ascuas" , min:8, max: 14},
      { nombre: "Lanzallamas" , min:12, max: 20},
    ]
  },
  bulbasaur: {
    nombre: "Bulbasaur",
    imagen: "img/bulbasaur1.png",
    ataques: [
      { nombre: "Placaje" , min:5, max: 10},
      { nombre: "Gruñido" , min:8, max: 14},
      { nombre: "Latigo Cepa" , min:12, max: 20},
    ]
    },
  squirtle: {
    nombre: "Squirtle",
    imagen: "img/squirtle1.png",
    ataques: [
      { nombre: "Placaje" , min:5, max: 10},
      { nombre: "Gruñido" , min:8, max: 14},
      { nombre: "Pistola de Agua" , min:12, max: 20},
    ]
  },
  psyduck: {
    nombre: "Psyduck",
    imagen: "img/psyduck.png",
    ataques: [
      { nombre: "Nada" , min:0, max: 0},
      { nombre: "Mordisco" , min:8, max: 14},
      { nombre: "Confusión" , min:12, max: 20},
    ]
  }
};

const selector = document.getElementById("selector-jugador");
const imgJugador = document.getElementById("img-jugador");
const nombreJugador = document.getElementById("nombre-jugador");
let pokemonEnemigo= null;
const imgEnemigo = document.getElementById("img-enemigo");
const nombreEnemigo = document.getElementById("nombre-enemigo");

/* SELECCION DE POKEMON AMIGO Y ENEMIGO */
selector.addEventListener("change", () => {
  const elegido = selector.value;

  if (pokemones[elegido]) {
    imgJugador.src = pokemones[elegido].imagen;
    imgJugador.alt = pokemones[elegido].nombre;
    nombreJugador.textContent = pokemones[elegido].nombre;
   
  /* POKEMON ENEMIGO ALEATORIO , MENOS EL QUE ELEGI */
    const claves = Object.keys(pokemones).filter(poke => poke !== elegido);
    const randomIndex = Math.floor(Math.random() * claves.length);
    pokemonEnemigo = claves[randomIndex];
    imgEnemigo.src = pokemones[pokemonEnemigo].imagen;
    imgEnemigo.alt = pokemones[pokemonEnemigo].nombre;
    nombreEnemigo.textContent = pokemones[pokemonEnemigo].nombre;

  } else {
    imgJugador.src = "img/pokeball.png";
    imgEnemigo.src = "img/pokeball.png"
    imgJugador.alt = "";
    nombreJugador.textContent = "Tu Pokémon";
    pokemonEnemigo = null;
  }
});
// VIDA Y ATAQUE DE LOS POKEMONES|
const btnBatalla = document.getElementById("btn-batalla");
const contenedorVidas = document.getElementById("vidas");
const vidaJugador = document.getElementById("vida-jugador");
const vidaOponente = document.getElementById("vida-oponente");

let hpJugador = 100;
let hpOponente = 100;

btnBatalla.addEventListener("click", () => {
  contenedorVidas.style.display = "flex";
  hpJugador = 100;
  hpOponente = 100;
  actualizarBarra(vidaJugador, hpJugador);
  actualizarBarra(vidaOponente, hpOponente);
});
/* ATAQUE DE POKEMON, falta agregar seleccion de ataques de PJ jugador, ataque-debilidad por tipos  */
function atacar(danio, aQuien) {
  if (aQuien === "enemigo") {
    hpOponente = Math.max(hpOponente - danio, 0);
    actualizarBarra(vidaOponente, hpOponente);
  } else if (aQuien === "jugador") {
    hpJugador = Math.max(hpJugador - danio, 0);
    actualizarBarra(vidaJugador, hpJugador);
  }
}

function actualizarBarra(barra, vida) {
  barra.style.width = vida + "%";
  barra.style.backgroundColor = vida > 50 ? "green" : vida > 20 ? "orange" : "red";
}

const btnAtacar = document.getElementById("btn-atacar");

btnAtacar.addEventListener("click", () => {
  atacar(20, "enemigo");
  setTimeout(() => ataqueEnemigo(pokemonEnemigo), 500);
});

function ataqueEnemigo(pokemon) {
  const ataques = pokemones[pokemon].ataques;
  const ataque = ataques[Math.floor(Math.random() * ataques.length)];
  const danio = Math.floor(Math.random() * (ataque.max - ataque.min + 1)) + ataque.min;

  /* ESTO LO TENGO QUE PONER EN UN DIV PARA MOSTRARLO EN PANTALLA  */
  console.log(`${pokemones[pokemon].nombre} usó ${ataque.nombre} e hizo ${danio} de daño`);
  atacar(danio, "jugador");
}