// Get name of the user
socket.emit("askName");
socket.on("getName", (name) => {
    document.getElementById("name").innerText = name;
});

// Plan
document.querySelector("header > #title").addEventListener("click", () => {
    window.location.href = "/";
});

// Réservations
document.querySelector("header > #profile > #pp").addEventListener("click", () => {
    window.location.href = "/reservations";
});
document.querySelector("header > #profile > #name").addEventListener("click", () => {
    window.location.href = "/reservations";
});

// Déconnexion
document.querySelector("header > #profile > #logout").addEventListener("click", () => {
    socket.emit("leave");
    window.location.reload();
});
