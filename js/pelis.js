document.addEventListener('DOMContentLoaded', () => {

    const urlPeliculas = 'https://japceibal.github.io/japflix_api/movies-data.json';
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const listaPeliculas = document.getElementById('lista');

    let peliculas = []; 

    fetch(urlPeliculas)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(data => {
        peliculas = data; 
        console.log('Información de películas cargada:', data);
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });

      function mostrarPeliculas(peliculasAMostrar) {
        listaPeliculas.innerHTML = ''; 
        listaPeliculas.classList.add('mx-5');
    
        peliculasAMostrar.forEach(pelicula => { 
            const releaseDate = new Date(pelicula.release_date);
    
           
            const offcanvasId = `offcanvasTop-${pelicula.id}`;
            const buttonId = `buttonOffcanvas-${pelicula.id}`;
    
            const li = document.createElement('li'); 
            li.innerHTML = `
    
                <button id="${buttonId}" class="list-group-item list-group-item-action bg-dark text-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasId}" aria-controls="${offcanvasId}">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 fw-bold">${pelicula.title}</h5>
                        <small>${generarEstrellas(pelicula.vote_average)}</small>
                    </div>
                    <p class="mb-1 fst-italic fw-lighter">${pelicula.tagline}</p>
                </button>
    
                <div class="offcanvas offcanvas-top" tabindex="-1" id="${offcanvasId}" aria-labelledby="offcanvasTopLabel-${pelicula.id}">
                    <div class="offcanvas-header">
                        <div class="col">
                            <h5 class="offcanvas-title fs-2" id="offcanvasTopLabel-${pelicula.id}">${pelicula.title}</h5>
                            <small class="text-muted">${pelicula.genres.map(genero => genero.name).join(' - ')}</small>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
    
                    <div class="offcanvas-body">
                        <p>${pelicula.overview}</p>
                        <div class="row">
                            <div class="col">
                                
                            </div>
                        </div>
                    </div>
                    <div class="text-center mb-3">
                        <div class="dropdown-center d-grid gap-2 col-6 mx-auto">
                            <button class="btn dropdown-toggle text-dark btn-outline-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </button>
                            <ul class="dropdown-menu dropdown-menu-start p-3 col-6 mx-auto">
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Year: </span><span>${releaseDate.getFullYear()}</span>
                                </li>
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Runtime: </span><span>${pelicula.runtime} mins</span>
                                </li>
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Budget: </span><span>$${pelicula.budget.toLocaleString()}</span>
                                </li>
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Revenue: </span><span>$${pelicula.revenue.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;
    
            listaPeliculas.appendChild(li); 
        });
    }
    

    function generarEstrellas(voteAverage) {
        const estrellas = Math.round(voteAverage / 2);
        let estrellasHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < estrellas) {
                estrellasHTML += '<i class="fa fa-star text-warning"></i>'; 
            } else {
                estrellasHTML += '<i class="fa fa-star-o text-warning"></i>'; 
            }
        }
        return estrellasHTML;
    }

    function filtrarPeliculas() {
        const busqueda = inputBuscar.value.toLowerCase(); 

        
        return peliculas.filter(pelicula => 
            pelicula.title.toLowerCase().includes(busqueda) || 
            pelicula.tagline.toLowerCase().includes(busqueda) || 
            pelicula.genres.join(', ').toLowerCase().includes(busqueda) || 
            pelicula.overview.toLowerCase().includes(busqueda)
        );
    }

    btnBuscar.addEventListener('click', function() {
        if (inputBuscar.value.trim() !== '') {
            const peliculasFiltradas = filtrarPeliculas(); 
            mostrarPeliculas(peliculasFiltradas); 
        } else {
            listaPeliculas.innerHTML = ''; 
        }
    });

  });