
document.addEventListener('DOMContentLoaded', () => {

    /// VARIABLES --->>>

    const urlBase = "https://api.pexels.com/v1";
    let form = document.querySelector('#img-form');
    let inputBusqueda = document.querySelector('#input-buscar');
    let msg = document.querySelector('#msg');
    let listaImagenes = document.querySelector('#img-buscadas');
    const listaCat = document.querySelector('#categorias');
    let numPag = document.querySelector('#pagNum');
    const prevBtn = document.querySelector("#prevPag")
    const sigBtn = document.querySelector("#sigPag")
    let urlNext = '';
    let urlPrev = '';
    const tamanioPag = 6;
    const regExp = /^[a-zA-Z\s]+$/;

    const fragment = document.createDocumentFragment();

    /// EVENTOS --->>>

    // evento submit busca por palabras y orientación
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        validarBusqueda();
        sigBtn.classList.remove('ocultar')
    });

    // evento click
    document.addEventListener('click', (ev) => {
        if (ev.target.id === 'prevPag') {
            limpiarLista();
            pintarBusqueda(urlPrev);
        };

        if (ev.target.id === 'sigPag') {
            limpiarLista();
            pintarBusqueda(urlNext);
            prevBtn.classList.remove('ocultar');
        };

        if (ev.target.id === '638479') {
            const urlCat = `${urlBase}/search?query=cars&page=1&per_page=${tamanioPag}`;
            limpiarLista();
            pintarBusqueda(urlCat);
            sigBtn.classList.remove('ocultar');
            msg.innerHTML = `Supercars:`;
        };

        if (ev.target.id === '7236026') {
            const urlCat = `${urlBase}/search?query=monuments&page=1&per_page=${tamanioPag}`;
            limpiarLista();
            pintarBusqueda(urlCat);
            sigBtn.classList.remove('ocultar');
            msg.innerHTML = `Places to visit:`;
        };

        if (ev.target.id === '1099680') {
            const urlCat = `${urlBase}/search?query=food&page=1&per_page=${tamanioPag}`;
            limpiarLista();
            pintarBusqueda(urlCat);
            sigBtn.classList.remove('ocultar');
            msg.innerHTML = `World Foods:`;
        };

    });

    /// FUNCIONES --->>>

    // función crea categorías 
    const crearCategoria = async (nombreCat, id) => {
        const urlImg = `${urlBase}/photos/${id}`
        const { ok, datos } = await consultar(urlImg);
        if (ok) {
            const { src } = datos;

            const cajaCat = document.createElement('FIGURE');
            const fotoCat = document.createElement('IMG');
            const nameCat = document.createElement('H4');

            fotoCat.setAttribute('ID', id);

            nameCat.innerHTML = nombreCat;
            fotoCat.src = src.medium;

            cajaCat.append(fotoCat);
            cajaCat.append(nameCat);
            listaCat.append(cajaCat);
        };
    };

    // función pinta mis 3 categorías iniciales
    const pintarCategorias = async () => {

        await crearCategoria('Supercars', '638479');
        await crearCategoria('Places', '7236026');
        await crearCategoria('Foods', '1099680');

    };

    // función valida busquedas
    const validarBusqueda = () => {
        if (!regExp.test(inputBusqueda.value)) {
            msg.innerHTML = 'Búsqueda no válida, prueba otra vez.';
            limpiarLista();
            form.reset();
        } else {
            limpiarLista();
            pintarBusqueda();
            msg.innerHTML = `Resultados de "${inputBusqueda.value}":`;
            form.reset()
        };
    };

    // función hace consultas
    const consultar = async (url) => {

        try {
            const resp = await fetch(url, {
                headers: {
                    'Authorization': 'OudFnoenLY6C9QkhLATr4wo5mOYZSzkyWSSOdepTmjiM2urK1yHH7V2V',
                },
            });

            if (resp.ok) {
                const datos = await resp.json();
                return {
                    ok: true,
                    datos
                };
            } else {
                throw ('Algo salió mal');
            };

        } catch (error) {
            return {
                ok: false,
                datos: error
            };
        };
    };

    // función pinta busquedas
    const pintarBusqueda = async (url) => {
        let pagActual = 1;
        let busquedaQuery = `${urlBase}/search?query=${inputBusqueda.value}&page=${pagActual}&per_page=${tamanioPag}`;
        if (url !== undefined) {
            busquedaQuery = url;
        };

        const { ok, datos } = await consultar(busquedaQuery)
        if (ok) {
            const { photos, prev_page, next_page, page } = datos;
            numPag.innerHTML = page;
            urlPrev = prev_page;
            urlNext = next_page;

            photos.forEach(({ id, src, photographer, alt }) => {

                listaImagenes.innerHTML;

                const cajaFoto = document.createElement('FIGURE');
                const foto = document.createElement('IMG');
                const autor = document.createElement('FIGCAPTION');

                foto.id = id;
                foto.src = src.medium;
                foto.alt = alt;
                autor.innerHTML = photographer;

                cajaFoto.append(foto, autor);
                fragment.append(cajaFoto);
            });
        };
        listaImagenes.append(fragment)
    };

    // función limpia lista
    const limpiarLista = () => {
        if (listaImagenes) {
            listaImagenes.innerHTML = ''
        };

    };

    /// INVOCACIONES --->>>

    pintarCategorias();

}) //////////LOAD//////////