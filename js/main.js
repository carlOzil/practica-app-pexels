
document.addEventListener('DOMContentLoaded', () => {

    /// VARIABLES --->>>

    const urlBase = "https://api.pexels.com/v1";
    let form = document.querySelector('#img-form');
    let inputBusqueda = document.querySelector('#input-buscar');
    let msg = document.querySelector('#msg');
    let listaImagenes = document.querySelector('#img-buscadas');
    let urlNext = '';
    let urlPrev = '';
    const tamanioPag = 6;
    let numPag = document.querySelector('#pagNum');

    const prevBtn = document.querySelector('#prevPag');
    const sigBtn = document.querySelector('#sigPag');

    const listaCat = document.querySelector('#categorias');

    const regExp = /^[a-zA-Z\s]+$/;

    const fragment = document.createDocumentFragment();


    /// EVENTOS --->>>
    // para mostrar categorías(click) [boton mostrar ocultar]
    // crear tres imagenes boton con imagen random para mostrar la busqueda de la palabra que nombre ese trend

    // evento busca por palabras
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        validarBusqueda();

    });

    // para pasar paginas de la busqueda(click)
    document.addEventListener('click', (ev) => {
        if (ev.target.id === 'prevPag') {

            limpiarLista();
            pintarBusqueda(urlPrev);

        };
        if (ev.target.id === 'sigPag') {

            limpiarLista();
            pintarBusqueda(urlNext);

        };
        if (ev.target.id === '8371843') {
            const urlCat = `${urlBase}/search?query=cars&page=1&per_page=${tamanioPag}`;
            limpiarLista();
            pintarBusqueda(urlCat);

        };
        if (ev.target.id === '14352566') {
            const urlCat = `${urlBase}/search?query=colombia&page=1&per_page=${tamanioPag}`;
            limpiarLista();
            pintarBusqueda(urlCat);

        };
        if (ev.target.id === '8448162') {
            const urlCat = `${urlBase}/search?query=food&page=1&per_page=${tamanioPag}`;
            limpiarLista();
            pintarBusqueda(urlCat);

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
            const nameCat = document.createElement('H3');

            fotoCat.setAttribute('ID', id);

            nameCat.innerHTML = nombreCat;
            fotoCat.src = src.medium;

            cajaCat.append(fotoCat);
            cajaCat.append(nameCat);
            listaCat.append(cajaCat)
        };
    };

    // función pinta mis 3 categorías al inicio
    const pintarCategorias = async () => {

        const card1 = await crearCategoria('Supercars', '8371843');
        const card2 = await crearCategoria('Colombia', '14352566');
        const card3 = await crearCategoria('World Foods', '8448162');

    }

    // función valida busquedas
    const validarBusqueda = () => {
        if (!regExp.test(inputBusqueda.value)) {
            msg.innerHTML = 'Búsqueda no válida, prueba otra vez.';
            limpiarLista()
            form.reset()
        } else {
            limpiarLista();
            pintarBusqueda();
            msg.innerHTML = `Mostrando resultados para "${inputBusqueda.value}":`;
            form.reset()
        };
    }

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
        pagActual = 1;
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

    // función limpia lista buscada
    const limpiarLista = () => {
        if (listaImagenes) {
            listaImagenes.innerHTML = ''
        };

    };
    // función limpia mensaje de respuesta a la busqueda
    // const limpiarMensaje = () => {
    //     if (msg) {
    //         msg.innerHTML = '';
    //     };
    // };



    /// INVOCACIONES --->>>

    pintarCategorias()

}) ////////////////////////////////////////