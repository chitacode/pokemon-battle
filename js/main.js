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

const btnAtacar = document.getElementById("btn-atacar");
const btnBatalla = document.getElementById("btn-batalla");
const nombreGuardado = localStorage.getItem("entrenador");

/* OBJETOS PARA SELECCIONAR TUS POKEMONES */
const pokemones = {
  pikachu: {
    nombre: "Pikachu",
    imagen: "img/pikachu.png",
    imagenDerrotado: "img/pikachuDefeated.jpg",
    ataques: [
      { nombre: "Arañazo" , min:5, max: 10},
      { nombre: "Impactrueno" , min:8, max: 14},
      { nombre: "Rayo" , min:12, max: 20},
    ]
   },
  charmander: {
    nombre: "Charmander",
    imagen: "img/charmander1.png",
    imagenDerrotado: "img/charmanderDefeated.png",
    ataques: [
      { nombre: "Arañazo" , min:5, max: 10},
      { nombre: "Ascuas" , min:8, max: 14},
      { nombre: "Lanzallamas" , min:12, max: 20},
    ]
  },
  bulbasaur: {
    nombre: "Bulbasaur",
    imagen: "img/bulbasaur1.png",
    imagenDerrotado: "img/bulbasaurDefeated.jpg",
    ataques: [
      { nombre: "Placaje" , min:5, max: 10},
      { nombre: "Gruñido" , min:8, max: 14},
      { nombre: "Latigo Cepa" , min:12, max: 20},
    ]
    },
  squirtle: {
    nombre: "Squirtle",
    imagen: "img/squirtle1.png",
    imagenDerrotado: "img/squirtleDefeated.jpg",
    ataques: [
      { nombre: "Placaje" , min:5, max: 10},
      { nombre: "Gruñido" , min:8, max: 14},
      { nombre: "Pistola de Agua" , min:12, max: 20},
    ]
  },
  psyduck: {
    nombre: "Psyduck",
    imagen: "img/psyduck.png",
    imagenDerrotado: "img/psyduckDefeated.jpg",
    ataques: [
      { nombre: "Nada" , min:0, max: 0},
      { nombre: "Mordisco" , min:8, max: 14},
      { nombre: "Confusión" , min:12, max: 20},
    ]
  }
};

const mensajeBatalla = document.getElementById("mensaje-batalla");

const selector = document.getElementById("selector-jugador");
const imgJugador = document.getElementById("img-jugador");
const nombreJugador = document.getElementById("nombre-jugador");
let pokemonEnemigo= null;
let elegido = null;
const imgEnemigo = document.getElementById("img-enemigo");
const nombreEnemigo = document.getElementById("nombre-enemigo");

/* SELECCION DE POKEMON AMIGO Y ENEMIGO */
 btnBatalla.disabled = true;
 btnAtacar.disabled = true;

 selector.addEventListener("change", () => {
   elegido = selector.value;
  
  
  if (pokemones[elegido]) {
    imgJugador.src = pokemones[elegido].imagen;
    imgJugador.alt = pokemones[elegido].nombre;
    nombreJugador.textContent = pokemones[elegido].nombre;
    
    /* POKEMON ENEMIGO ALEATORIO , MENOS EL QUE ELEJI */
    const claves = Object.keys(pokemones).filter(poke => poke !== elegido);
    const randomIndex = Math.floor(Math.random() * claves.length);
    pokemonEnemigo = claves[randomIndex];
    imgEnemigo.src = pokemones[pokemonEnemigo].imagen;
    imgEnemigo.alt = pokemones[pokemonEnemigo].nombre;
    nombreEnemigo.textContent = pokemones[pokemonEnemigo].nombre;
    
    btnBatalla.disabled = false;

  } else {
    imgJugador.src = "img/pokeball.png";
    imgEnemigo.src = "img/pokeball.png"
    imgJugador.alt = "";
    nombreJugador.textContent = "Tu Pokémon";
    pokemonEnemigo = null;
   
  }
});
// VIDA Y ATAQUE DE LOS POKEMONES|

const contenedorVidas = document.getElementById("vidas");
const vidaJugador = document.getElementById("vida-jugador");
const vidaOponente = document.getElementById("vida-oponente");

let hpJugador = 100;
let hpOponente = 100;

btnBatalla.addEventListener("click", () => {
   if (btnBatalla.textContent === "Reiniciar") {
    resetJuego();
    return;
  }

  contenedorVidas.style.display = "flex";
  hpJugador = 100;
  hpOponente = 100;
  actualizarBarra(vidaJugador, hpJugador);
  actualizarBarra(vidaOponente, hpOponente);
  btnBatalla.disabled = true;
  selector.disabled = true;
  btnAtacar.disabled = false;
});
/* ATAQUE DE POKEMON, falta agregar seleccion de ataques de PJ jugador, ataque-debilidad por tipos, TENGO QUE REINICIAR TODO CUANDO SE GANA O SE PIERDE */
function atacar(danio, aQuien) {
  if (aQuien === "enemigo") {
    hpOponente = Math.max(hpOponente - danio, 0);
    actualizarBarra(vidaOponente, hpOponente);

    if (hpOponente === 0) {
      imgEnemigo.src = pokemones[pokemonEnemigo].imagenDerrotado;
      mensajeBatalla.textContent = "¡Ganaste la batalla!";
      guardarResultadoBatalla(localStorage.getItem("entrenador"), pokemones[elegido].nombre, pokemones[pokemonEnemigo].nombre, "ganada");
        finDeBatalla();
    }

  } else if (aQuien === "jugador") {
    hpJugador = Math.max(hpJugador - danio, 0);
    actualizarBarra(vidaJugador, hpJugador);

    if (hpJugador === 0) {
      imgJugador.src = pokemones[elegido].imagenDerrotado;
      mensajeBatalla.textContent = "Perdiste la batalla, entrena mejor a tus pokemons";
      guardarResultadoBatalla(localStorage.getItem("entrenador"), pokemones[elegido].nombre, pokemones[pokemonEnemigo].nombre, "perdida");
      finDeBatalla();
    }
  }
}
/* REACTIVA EL BOTON BATALLA Y EL SELECTOR */
function finDeBatalla() {
  btnBatalla.textContent = "Reiniciar";
  btnBatalla.disabled = false;
  btnAtacar.disabled = true
  selector.disabled = false;
}

function actualizarBarra(barra, vida) {
  barra.style.width = vida + "%";
  barra.style.backgroundColor = vida > 50 ? "green" : vida > 20 ? "orange" : "red";
}


/* ESTO LO TENGO QUE MODIFICAR POR QUE SIEMPRE BAJA LO MISMO, HACER UNA SELECCION DE ATAQUES O ATAQUE RANDOM */ 
btnAtacar.addEventListener("click", () => {
  atacar(20, "enemigo");
  setTimeout(() => ataqueEnemigo(pokemonEnemigo), 200);
});

function ataqueEnemigo(pokemon) {
  const ataques = pokemones[pokemon].ataques;
  const ataque = ataques[Math.floor(Math.random() * ataques.length)];
  const danio = Math.floor(Math.random() * (ataque.max - ataque.min + 1)) + ataque.min;

  /* ESTO LO TENGO QUE PONER EN UN DIV PARA MOSTRARLO EN PANTALLA  */
  console.log(`${pokemones[pokemon].nombre} usó ${ataque.nombre} e hizo ${danio} de daño`);
  atacar(danio, "jugador");
}

function resetJuego() {

  imgJugador.src = "img/pokeball.png";
  imgJugador.alt = "";
  nombreJugador.textContent = "Tu Pokémon";

  imgEnemigo.src = "img/pokeball.png";
  imgEnemigo.alt = "";
  nombreEnemigo.textContent = "Oponente";

  contenedorVidas.style.display = "none";
  vidaJugador.style.width = "100%";
  vidaOponente.style.width = "100%";


  mensajeBatalla.textContent = "";

  selector.disabled = false;
  btnBatalla.textContent = "Empezar Batalla";
  btnBatalla.disabled = true;
  btnAtacar.disabled = true;


  hpJugador = 100;
  hpOponente = 100;
}


/* intento de JSON con localstorage */ 
function guardarResultadoBatalla(entrenador, pokemonJugador, pokemonEnemigo, resultado) {
  const nuevaBatalla = {
    fecha: new Date().toLocaleString(),
    entrenador: entrenador,
    pokemonJugador: pokemonJugador,
    pokemonEnemigo: pokemonEnemigo,
    resultado: resultado
  };


  const historial = JSON.parse(localStorage.getItem("historialBatallas")) || [];
  const contenedorHistorial = document.getElementById("historial-container");

  
  historial.push(nuevaBatalla);

  localStorage.setItem("historialBatallas", JSON.stringify(historial));



/* ESTO LIMPIA */
contenedorHistorial.innerHTML = "";

if (historial.length === 0) {
  contenedorHistorial.textContent = "Todavía no hay historial";
} else {
  historial.forEach(batalla => {
    const p = document.createElement("p");
    p.textContent = `${batalla.fecha} - Entrenador: ${batalla.entrenador} - Pokémon: ${batalla.pokemonJugador} vs ${batalla.pokemonEnemigo} - Resultado: ${batalla.resultado}`;
    contenedorHistorial.appendChild(p);
  });
}
}