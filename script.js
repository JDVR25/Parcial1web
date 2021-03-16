var info;
const body = document.body;
const main = document.createElement('main');
const favoritos = [];
body.appendChild(main);
function guardarValores(data){
    info = data;
    listadoItems();
    
}

const solicitarData = fetch('https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce');

solicitarData.then((resp) => resp.json()).then(guardarValores);



function listadoItems(){
    const divLista = document.createElement('div');
    divLista.className = 'lista';
    const array = info.items;
    main.appendChild(divLista);
    for (let index = 0; index < array.length; index++) {
        const temp = document.createElement('div');
        temp.className = 'itemLista';

        const celImg = document.createElement('img');
        celImg.src = array[index].picture;
        celImg.className = 'listImg';
        celImg.addEventListener('click', function () {
            divLista.style.display = "none";
            detalle(array[index]);
        });
        temp.appendChild(celImg);

        const precio = document.createElement('div');
        precio.textContent = '$' + array[index].price.amount
        precio.className = 'precioList';
        var toptemp = 30 + 221*index;
        precio.style.top = toptemp + 'px';
        temp.appendChild(precio);

        const nombre = document.createElement('div');
        nombre.textContent = array[index].title
        nombre.className = 'nomList';
        toptemp = 112 + 221*index;
        nombre.style.top = toptemp + 'px';
        temp.appendChild(nombre);

        const pais = document.createElement('div');
        pais.textContent = array[index].location
        pais.className = 'paisLista';
        toptemp = 30 + 221*index;
        pais.style.top = toptemp + 'px';
        temp.appendChild(pais);

        if(array[index].free_shipping == true)
        {
            const free = document.createElement('img');
            free.className = 'envioGratis';
            var toptemp = 34 + 221*index;
            free.style.top = toptemp + 'px';
            temp.appendChild(free);
        }

        divLista.appendChild(temp);

        

    }
    const buscar = document.querySelector('.subDivBuscar');
    buscar.addEventListener('click', function () {
        divLista.style.display = "none";
        filtrarLista(document.querySelector('.inputBusc').value);
    })
    const linkfavoritos = document.querySelector('.favoritos');
    linkfavoritos.addEventListener('click', function () {
        divLista.style.display = "none";
        listaFavoritos();
    })
    
}

function filtrarLista(categoria)
{
    const array = []
    info.items.forEach(element => {
        if(element.categories.indexOf(categoria) >= 0)
        {
            array.push(element);
        }
    });

    const divLista = document.createElement('div');
    divLista.className = 'lista';
    main.appendChild(divLista);
    for (let index = 0; index < array.length; index++) {
        const temp = document.createElement('div');
        temp.className = 'itemLista';

        const celImg = document.createElement('img');
        celImg.src = array[index].picture;
        celImg.className = 'listImg';
        celImg.addEventListener('click', function () {
            divLista.style.display = "none";
            detalle(array[index]);
        });
        temp.appendChild(celImg);

        const precio = document.createElement('div');
        precio.textContent = '$' + array[index].price.amount
        precio.className = 'precioList';
        var toptemp = 30 + 221*index;
        precio.style.top = toptemp + 'px';
        temp.appendChild(precio);

        const nombre = document.createElement('div');
        nombre.textContent = array[index].title
        nombre.className = 'nomList';
        toptemp = 112 + 221*index;
        nombre.style.top = toptemp + 'px';
        temp.appendChild(nombre);

        const pais = document.createElement('div');
        pais.textContent = array[index].location
        pais.className = 'paisLista';
        toptemp = 30 + 221*index;
        pais.style.top = toptemp + 'px';
        temp.appendChild(pais);

        if(array[index].free_shipping == true)
        {
            const free = document.createElement('img');
            free.className = 'envioGratis';
            var toptemp = 34 + 221*index;
            free.style.top = toptemp + 'px';
            temp.appendChild(free);
        }

        divLista.appendChild(temp);
    }
    if(array.length < 1)
    {
        const temp = document.createElement('div');
        temp.className = 'itemLista';
        temp.textContent = "no hay elementos de la categoria: " + categoria;
        divLista.appendChild(temp);
    }
    const linkfavoritos = document.querySelector('.favoritos');
    linkfavoritos.addEventListener('click', function () {
        divLista.style.display = "none";
        listaFavoritos();
    })
}

function detalle(celular)
{
    var categorias = "";
    for (let index = 0; index < celular.categories.length; index++) {
        const element = celular.categories[index];
        if(index < celular.categories.length-1)
        {
            categorias = categorias + element + " > ";
        }
        else{
            categorias = categorias+ element;
        }
    }
    const bradcrumb = document.createElement('div');
    bradcrumb.className = 'categorias';
    bradcrumb.textContent = categorias;
    main.appendChild(bradcrumb);


    const divDetalle = document.createElement('div');
    divDetalle.className = 'detalle';
    main.appendChild(divDetalle);

    const celImg = document.createElement('img');
    celImg.src = celular.picture;
    celImg.className = 'detImg';
    divDetalle.appendChild(celImg);

    const titulo = document.createElement('div');
    titulo.textContent = "Descripción del producto";
    titulo.className = 'desc';
    divDetalle.appendChild(titulo);

    const descripcion = document.createElement('div');
    descripcion.textContent = celular.description;
    descripcion.className = 'descripcion';
    divDetalle.appendChild(descripcion);

    const estado = document.createElement('div');
    estado.textContent = celular.condition + " | " + celular.sold_quantity + " vendidos";
    estado.className = 'estado';
    divDetalle.appendChild(estado);

    const nombre = document.createElement('div');
    nombre.textContent = celular.title;
    nombre.className = 'nomDet';
    divDetalle.appendChild(nombre);

    const precio = document.createElement('div');
    precio.textContent = '$' + celular.price.amount;
    precio.className = 'detPre';
    divDetalle.appendChild(precio);

    const comprar = document.createElement('button');
    comprar.textContent = 'Comprar';
    comprar.className = 'botonComprar';
    comprar.addEventListener('click', function () {
        alert(celular.title + "\nAñadido al carrito de compras");
    });
    divDetalle.appendChild(comprar);

    let esFavorito = false;
    favoritos.forEach(element => {
        if(element.id === celular.id)
        {
            esFavorito = true;
        }
    });
    const favorito = document.createElement('button');
    favorito.textContent = esFavorito?'Quitar de favoritos':'Añadir a favoritos';
    favorito.className = 'botonFavorito';
    favorito.addEventListener('click', function () {
        var indice = favoritos.indexOf(celular);
        console.log(indice);
        if(indice >= 0)
        {
            favoritos.splice(indice,1);
            favorito.textContent = 'Añadir a favoritos';
            alert(celular.title + "\nEliminado de los favoritos");
        }
        else
        {
            favoritos.push(celular);
            favorito.textContent = 'Quitar de favoritos';
            alert(celular.title + "\nAñadido a los favoritos");
        }
        
    });
    divDetalle.appendChild(favorito);
    
    const buscar = document.querySelector('.subDivBuscar');
    buscar.addEventListener('click', function () {
        divDetalle.style.display = "none";
        bradcrumb.style.display = "none";
        filtrarLista(document.querySelector('.inputBusc').value);
    })
    const linkfavoritos = document.querySelector('.favoritos');
    linkfavoritos.addEventListener('click', function () {
        divDetalle.style.display = "none";
        bradcrumb.style.display = "none";
        listaFavoritos();
    })
    
}

function listaFavoritos()
{
    const divLista = document.createElement('div');
    divLista.className = 'listaFav';
    const array = favoritos;
    main.appendChild(divLista);

    const eli = document.createElement('div');
    eli.className = "itemEliminar";
    divLista.appendChild(eli);

    const ckTotal = document.createElement('input');
    ckTotal.className = 'checkSquare';
    ckTotal.setAttribute("type","checkbox");
    eli.appendChild(ckTotal);

    const botonEl = document.createElement('button');
    botonEl.className = 'butEliminar';
    botonEl.textContent = 'Eliminar';
    eli.appendChild(botonEl);

    for (let index = 0; index < array.length; index++) {
        const temp = document.createElement('div');
        temp.className = 'itemFav';

        const celImg = document.createElement('img');
        celImg.src = array[index].picture;
        celImg.className = 'listImg';
        celImg.addEventListener('click', function () {
            divLista.style.display = "none";
            detalle(array[index]);
        });
        temp.appendChild(celImg);

        const precio = document.createElement('div');
        precio.textContent = '$' + array[index].price.amount
        precio.className = 'precioList';
        var toptemp = 30 + 221*index;
        precio.style.top = toptemp + 'px';
        temp.appendChild(precio);

        const nombre = document.createElement('div');
        nombre.textContent = array[index].title
        nombre.className = 'nomList';
        toptemp = 112 + 221*index;
        nombre.style.top = toptemp + 'px';
        temp.appendChild(nombre);

        const pais = document.createElement('div');
        pais.textContent = array[index].location
        pais.className = 'paisLista';
        toptemp = 30 + 221*index;
        pais.style.top = toptemp + 'px';
        temp.appendChild(pais);

        if(array[index].free_shipping == true)
        {
            const free = document.createElement('img');
            free.className = 'envioGratis';
            var toptemp = 34 + 221*index;
            free.style.top = toptemp + 'px';
            temp.appendChild(free);
        }

        divLista.appendChild(temp);

        

    }
    const buscar = document.querySelector('.subDivBuscar');
    buscar.addEventListener('click', function () {
        divLista.style.display = "none";
        filtrarLista(document.querySelector('.inputBusc').value);
    })
}
