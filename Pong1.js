// Seleccionar el lienzo del juego
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Objeto de la paleta del jugador
const player = {
  x: 0,
  y: canvas.height / 2 - 60 / 2,
  width: 10,
  height: 60,
  color: "#fff",
  dy: 4,
};

// Objeto de la paleta de la computadora
const computer = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 60 / 2,
  width: 10,
  height: 60,
  color: "#fff",
  dy: 4,
};

// Objeto de la pelota
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: 4,
  color: "#fff",
};

// Dibuja el objeto del jugador
function drawPlayer() {
  context.fillStyle = player.color;
  context.fillRect(player.x, player.y, player.width, player.height);
}

// Dibuja el objeto de la computadora
function drawComputer() {
  context.fillStyle = computer.color;
  context.fillRect(computer.x, computer.y, computer.width, computer.height);
}

// Dibuja la pelota
function drawBall() {
  context.fillStyle = ball.color;
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

// Mueve el objeto del jugador
function movePlayer() {
  player.y += player.dy;

  if (player.y < 0) {
    player.y = 0;
  }

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }
}

// Mueve el objeto de la computadora
function moveComputer() {
  computer.y += computer.dy;

  if (computer.y < 0) {
    computer.y = 0;
  }

  if (computer.y + computer.height > canvas.height) {
    computer.y = canvas.height - computer.height;
  }
}

// Mueve la pelota
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  if (
    ball.x - ball.radius < player.x + player.width &&
    ball.y > player.y &&
    ball.y < player.y + player.height
  ) {
    ball.dx *= -1;
  }

  if (
    ball.x + ball.radius > computer.x &&
    ball.y > computer.y &&
    ball.y < computer.y + computer.height
  ) {
    ball.dx *= -1;
  }
}

// Actualiza el lienzo del juego
function update() {
  movePlayer();
  moveComputer();
  moveBall();

  // Borra el lienzo
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja los objetos en el lienzo
  drawPlayer();
  drawComputer();
  drawBall();

  // Llama a la función update nuevamente
  requestAnimationFrame(update);
}

// Escucha los eventos de teclado para mover al jugador
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    player.dy = -4;
  } else if (event.key === "ArrowDown") {
    player.dy = 4;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    player.dy = 0;
  }
});

// Inicia el juego
update();
