document.addEventListener("DOMContentLoaded", function () {

    // GOATCOUNTER
    const goatScript = document.createElement("script");
    goatScript.setAttribute(
        "data-goatcounter",
        "https://bersaglieripaceco.goatcounter.com/count"
    );
    goatScript.async = true;
    goatScript.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(goatScript);


    // MENU COMUNE
    const contenitoreMenu = document.getElementById("menu-comune");

    if (contenitoreMenu) {
        fetch("/menu.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nel caricamento del menu");
                }
                return response.text();
            })
            .then(menu => {
                contenitoreMenu.innerHTML = menu;

                const dropdown = contenitoreMenu.querySelector(".dropdown");

                if (dropdown) {
                    const linkDropdown =
                        dropdown.querySelector(".dropdown-link");

                    if (linkDropdown) {
                        linkDropdown.addEventListener("click", function (event) {
                            event.preventDefault();
                            dropdown.classList.toggle("open");
                        });
                    }
                }
            })
            .catch(error => console.error(error));
    }


    // COLONNE LATERALI COMUNI
    const areaContenuto = document.getElementById("contenuto");
    const centrale = document.getElementById("centrale");

    if (areaContenuto && centrale) {
        fetch("/colonne.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nel caricamento delle colonne");
                }
                return response.text();
            })
            .then(html => {
                const contenitoreTemporaneo = document.createElement("div");
                contenitoreTemporaneo.innerHTML = html;

                const sinistra =
                    contenitoreTemporaneo.querySelector("#sinistra");

                const destra =
                    contenitoreTemporaneo.querySelector("#destra");

                if (sinistra) {
                    areaContenuto.insertBefore(sinistra, centrale);
                }

                if (destra) {
                    centrale.insertAdjacentElement("afterend", destra);
                }

                aggiornaDataOra();
            })
            .catch(error => console.error(error));
    }

    // DATA E ORA
    function aggiornaDataOra() {
        const elemento = document.getElementById("data-ora");

        if (!elemento) return;

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
