const socket = io();

const input = document.querySelector("input");
document.querySelector("button").addEventListener("click", () => {
  socket.emit("mensaje", input.value);
});

socket.on("mensajes", (mensajes) => {
  const mensajesInput = mensajes
    .map(
      (mensaje) =>
        `SocketId: ${mensaje.socketid} -> Mensajes: ${mensaje.mensaje}`
    )
    .join("<br>");
  document.querySelector("p").innerHTML = mensajesInput;
});
