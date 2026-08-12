document.addEventListener("DOMContentLoaded", function () {

    const contenitoreMenu = document.getElementById("menu-comune");

    if (!contenitoreMenu) {
        return;
    }

    /*
     * Determina automaticamente dove si trova la pagina.
     * Se siamo nella cartella Pagine, il menu si trova un livello sopra.
     * Se siamo nella Home, il menu si trova nella stessa cartella.
     */

    const percorsoMenu = window.location.pathname.includes("/Pagine/")
        ? "../menu.html"
        : "menu.html";

    fetch(percorsoMenu)
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

            console.error(
                "Errore nel caricamento del menu:",
                errore
            );

        });

});
