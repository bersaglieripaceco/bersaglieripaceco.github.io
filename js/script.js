document.addEventListener("DOMContentLoaded", function () {

    const contenitoreMenu = document.getElementById("menu-comune");

    if (!contenitoreMenu) {
        return;
    }

    fetch("../menu.html")
        .then(function (risposta) {

            if (!risposta.ok) {
                throw new Error("Impossibile caricare il menu.");
            }

            return risposta.text();

        })
        .then(function (menu) {

            contenitoreMenu.innerHTML = menu;

        })
        .catch(function (errore) {

            console.error("Errore nel caricamento del menu:", errore);

        });

});// Progetto Bersaglieri Paceco
// Script iniziale// JavaScript Document