
document.addEventListener('DOMContentLoaded', () => {

    /// VARIABLES --->>>

    const urlBase = "https://api.pexels.com/v1";
    let form = document.querySelector('#img-form');
    let inputBusqueda = document.querySelector('#input-buscar');
    let msg = document.querySelector('#msg');
    let listaImagenes = document.querySelector('#img-buscadas');
    const tamanioPag = 6;

    /* const prevBtn = document.querySelector('#prevPag');
     const sigBtn = document.querySelector('#sigPag');
     let pagActual = 1;
     let prevPag = '';
     let sigPag = '';*/

    const regExp = /^[a-zA-Z\s]+$/;

    const fragment = document.createDocumentFragment();

    /// ARRAYS --->>>
    // array para mostrar fotos random en las tres tendencias iniciales

    /// EVENTOS --->>>
    // para mostrar categorías(click) [como enla práctica de películas mostrar según género]
    // crear tres imagenes boton con imagen random para mostrar la busqueda de la palabra que nombre ese trend
    // para buscar(submit) [como en la práctica de multas para buscar]

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        validarBusqueda(inputBusqueda.value);

    });

    // para pasar paginas de la busqueda(click)

    /* document.addEventListener('click', (ev) => {
         if (ev.target.id == "sigBtn") {
             //cambiarPagina(sigPag);
             console.log(sigPag)
         };
     });*/



    /// FUNCIONES --->>>
    // mostrar tendencias

    // validar busquedas
    const validarBusqueda = (inputBusqueda) => {
        if (!regExp.test(inputBusqueda)) {
            msg.innerHTML = 'Búsqueda no válida, prueba otra vez.';
            form.reset()
        } else {
            limpiarLista();
            limpiarMensaje();
            pintarBusqueda(`/search?query=${inputBusqueda}&per_page=${tamanioPag}`);
            msg.innerHTML = `Mostrando resultados para "${inputBusqueda}":`;
            form.reset()
        };
    }
    // hacer consultas
    const ejecutarBusqueda = async (url) => {

        try {

            const resp = await fetch(`${urlBase}/${url}`, {
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
    // pintar busquedas
    const pintarBusqueda = async (url) => {

        const { ok, datos } = await ejecutarBusqueda(url)

        if (ok) {
            const { photos, prev_page, next_page } = datos;
            //prevPag = prev_page;
            //sigPag = next_page;

            photos.forEach(({ id, src, photographer }) => {

                listaImagenes.innerHTML;

                const cajaFoto = document.createElement('FIGURE');
                const foto = document.createElement('IMG');
                const autor = document.createElement('FIGCAPTION');

                foto.src = src.medium;
                foto.id = id;
                autor.innerHTML = photographer;

                cajaFoto.append(foto, autor);
                fragment.append(cajaFoto);
            });

        };
        listaImagenes.append(fragment)
    };

    const limpiarLista = () => {
        if (listaImagenes) {
            listaImagenes.innerHTML = ''
        };

    };

    const limpiarMensaje = () => {
        if (msg) {
            msg.innerHTML = ''
        };
    };


}) ////////////////////////////////////////