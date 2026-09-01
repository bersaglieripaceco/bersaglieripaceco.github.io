document.addEventListener("DOMContentLoaded", function () {

    const contenitoreMenu = document.getElementById("menu-comune");

    if (!contenitoreMenu) {
        return;
    }

    fetch("/menu.html")
        .then(function (risposta) {

            if (!risposta.ok) {
                throw new Error("Impossibile caricare il menu.");
            }

            return risposta.text();

        })

        .then(function (menu) {

            contenitoreMenu.innerHTML = menu;

            /*
             * Gestione del menu a tendina
             */

            const dropdown = contenitoreMenu.querySelector(".dropdown");

            if (dropdown) {

                const linkDropdown =
                    dropdown.querySelector(".dropdown-link");

                if (linkDropdown) {

                    linkDropdown.addEventListener("click", function (evento) {

                        evento.preventDefault();

                        dropdown.classList.toggle("open");

                    });

                }

            }

        })

        .catch(function (errore) {

            console.error(
                "Errore nel caricamento del menu:",
                errore
            );

        });
// =====================================================
// DATA E ORA
// =====================================================

function aggiornaDataOra() {

    const elemento = document.getElementById("data-ora");

    if (!elemento) {
        return;
    }

    const adesso = new Date();

    const data = adesso.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const ora = adesso.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    elemento.innerHTML =
        data.charAt(0).toUpperCase() + data.slice(1) +
        "<br>Ore " + ora;
}

aggiornaDataOra();

setInterval(aggiornaDataOra, 1000);
});
