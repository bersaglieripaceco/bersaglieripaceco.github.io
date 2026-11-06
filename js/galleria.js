
/* ==================================================
   GALLERIA FOTOGRAFICA
   BERSAGLIERI PACECO
   ================================================== */

/*
   PER AGGIUNGERE UN ALBUM:

   1. Inserire il titolo della manifestazione.
   2. Inserire l'anno.
   3. Indicare la fotografia di copertina.
   4. Inserire i nomi delle fotografie dell'album.

   Le fotografie devono essere caricate nella cartella
   Immagini/Galleria.
*/

const albums = [

    /*
    ESEMPIO DI ALBUM DA PERSONALIZZARE:

    {
        titolo: "4 Novembre 2026",
        anno: "2026",
        descrizione: "Giornata delle Forze Armate",
        copertina: "/Immagini/Galleria/2026/4-Novembre/foto1.jpg",

        foto: [
            "/Immagini/Galleria/2026/4-Novembre/foto1.jpg",
            "/Immagini/Galleria/2026/4-Novembre/foto2.jpg",
            "/Immagini/Galleria/2026/4-Novembre/foto3.jpg"
        ]
    }

    */

];


/* ELEMENTI DELLA PAGINA */

const elencoAlbum = document.getElementById("elenco-album");
const visualizzatore = document.getElementById("visualizzatore-album");
const titoloAlbum = document.getElementById("titolo-album");
const grigliaFoto = document.getElementById("griglia-foto");
const tornaAlbum = document.getElementById("torna-album");


/* FOTOGRAFIA INGRANDITA */

let indiceFoto = 0;
let fotoCorrenti = [];


/* CREA IL VISUALIZZATORE */

const luce = document.createElement("div");
luce.id = "luce-galleria";

luce.innerHTML = `
    <button id="chiudi-galleria" type="button"
            aria-label="Chiudi">&times;</button>

    <button id="foto-precedente" type="button"
            aria-label="Foto precedente">&#10094;</button>

    <img id="foto-ingrandita" src="" alt="Fotografia ingrandita">

    <button id="foto-successiva" type="button"
            aria-label="Foto successiva">&#10095;</button>
`;

document.body.appendChild(luce);

const fotoIngrandita = document.getElementById("foto-ingrandita");


/* MOSTRA GLI ALBUM */

function mostraAlbum() {

    if (!elencoAlbum) return;

    elencoAlbum.innerHTML = "";

    if (albums.length === 0) {

        elencoAlbum.innerHTML = `
            <p class="galleria-attesa">
                Gli album fotografici saranno disponibili
                appena inseriremo le prime fotografie.
            </p>
        `;

        return;
    }

    albums.forEach((album, indice) => {

        const scheda = document.createElement("div");
        scheda.className = "album-card";
        scheda.tabIndex = 0;
        scheda.setAttribute("role", "button");
        scheda.setAttribute("aria-label", "Apri album " + album.titolo);

        const immagine = document.createElement("img");
        immagine.src = album.copertina;
        immagine.alt = album.titolo;
        immagine.loading = "lazy";

        const informazioni = document.createElement("div");
        informazioni.className = "album-info";

        const titolo = document.createElement("h3");
        titolo.textContent = album.titolo;

        const descrizione = document.createElement("p");
        descrizione.textContent =
            album.descrizione + " - " + album.foto.length + " fotografie";

        informazioni.appendChild(titolo);
        informazioni.appendChild(descrizione);

        scheda.appendChild(immagine);
        scheda.appendChild(informazioni);

        scheda.addEventListener("click", () => apriAlbum(indice));

        scheda.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                apriAlbum(indice);
            }
        });

        elencoAlbum.appendChild(scheda);

    });

}


/* APRE UN ALBUM */

function apriAlbum(indice) {

    const album = albums[indice];

    titoloAlbum.textContent = album.titolo;

    fotoCorrenti = album.foto;

    grigliaFoto.innerHTML = "";

    fotoCorrenti.forEach((percorso, numero) => {

        const immagine = document.createElement("img");

        immagine.src = percorso;
        immagine.alt = album.titolo + " - fotografia " + (numero + 1);
        immagine.loading = "lazy";

        immagine.addEventListener("click", () => {
            apriFoto(numero);
        });

        grigliaFoto.appendChild(immagine);

    });

    elencoAlbum.style.display = "none";
    visualizzatore.style.display = "block";

    titoloAlbum.scrollIntoView({ behavior: "smooth", block: "start" });

}


/* TORNA ALL'ELENCO ALBUM */

tornaAlbum.addEventListener("click", () => {

    visualizzatore.style.display = "none";
    elencoAlbum.style.display = "grid";

    elencoAlbum.scrollIntoView({ behavior: "smooth", block: "start" });

});


/* APRE UNA FOTOGRAFIA */

function apriFoto(indice) {

    indiceFoto = indice;

    fotoIngrandita.src = fotoCorrenti[indiceFoto];

    luce.classList.add("aperta");

    document.body.style.overflow = "hidden";

}


/* FOTO SUCCESSIVA */

function fotoSuccessiva() {

    if (fotoCorrenti.length === 0) return;

    indiceFoto = (indiceFoto + 1) % fotoCorrenti.length;

    fotoIngrandita.src = fotoCorrenti[indiceFoto];

}


/* FOTO PRECEDENTE */

function fotoPrecedente() {

    if (fotoCorrenti.length === 0) return;

    indiceFoto =
        (indiceFoto - 1 + fotoCorrenti.length) % fotoCorrenti.length;

    fotoIngrandita.src = fotoCorrenti[indiceFoto];

}


/* CHIUSURA FOTOGRAFIA */

function chiudiFoto() {

    luce.classList.remove("aperta");

    fotoIngrandita.src = "";

    document.body.style.overflow = "";

}


document.getElementById("chiudi-galleria")
    .addEventListener("click", chiudiFoto);

document.getElementById("foto-successiva")
    .addEventListener("click", fotoSuccessiva);

document.getElementById("foto-precedente")
    .addEventListener("click", fotoPrecedente);


/* CHIUSURA CLICCANDO FUORI DALLA FOTO */

luce.addEventListener("click", (evento) => {

    if (evento.target === luce) {
        chiudiFoto();
    }

});


/* COMANDI DA TASTIERA */

document.addEventListener("keydown", (evento) => {

    if (!luce.classList.contains("aperta")) return;

    if (evento.key === "Escape") {
        chiudiFoto();
    }

    if (evento.key === "ArrowRight") {
        fotoSuccessiva();
    }

    if (evento.key === "ArrowLeft") {
        fotoPrecedente();
    }

});


/* AVVIO GALLERIA */

mostraAlbum();

