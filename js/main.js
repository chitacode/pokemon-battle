const pokemones = {
  pikachu: {
    nombre: "Pikachu",
    imagen: "img/pikachu 1.avif"
  },
  charmander: {
    nombre: "Charmander",
    imagen: "img/charmander1.png"
  },
  bulbasaur: {
    nombre: "Bulbasaur",
    imagen: "img/bulbasaur1.png"
    },
  squirtle: {
    nombre: "Squirtle",
    imagen: "img/squirtle1.png"
  },
  traniela: {
    nombre: "Traniela",
    imagen: "img/Traniela.jpg"
  }
};

const selector = document.getElementById("selector-jugador");
const imgJugador = document.getElementById("img-jugador");
const nombreJugador = document.getElementById("nombre-jugador");

selector.addEventListener("change", () => {
  const elegido = selector.value;

  if (pokemones[elegido]) {
    imgJugador.src = pokemones[elegido].imagen;
    imgJugador.alt = pokemones[elegido].nombre;
    nombreJugador.textContent = pokemones[elegido].nombre;
  } else {
    imgJugador.src = "";
    imgJugador.alt = "";
    nombreJugador.textContent = "Tu Pokémon";
  }
});

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
});