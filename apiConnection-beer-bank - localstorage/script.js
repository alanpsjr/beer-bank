"use strict";

var request = new XMLHttpRequest();
request.open('GET', 'https://api.punkapi.com/v2/beers?page=1&per_page=80', true);
request.onload = function () {
  var data = JSON.parse(this.response)
 
////////////////////////////////////////////////////////////////////////
  class BeerAPI {
    constructor() {
      this.apiUrl = 'https://api.punkapi.com/v2/beers'
    }
    
    searchByName(name, callback) {
      const url = this.apiUrl
      const params = {
        'beer_name': name
      }
  
      $.getJSON(url, params)
        .done((data) => {
          callback(data)
        })
        .fail((response) => {
          callback(null)
        })
     }
  }
  
  class BeerSearch {
    constructor() {
      this.BeerAPI = new BeerAPI()
      this.elements = {
        'form': $('#search-form'),
        'input': $('#search-input'),
        'results': $('.beers')
      }
      
      this.registerEvents()
    }
    
    registerEvents() {
      this.elements.form.on('submit', (e) => {
        e.preventDefault()
        const userInput = this.elements.input.val().trim()
        
        this.BeerAPI.searchByName(
          userInput, (data) => {
            this.showResults(data)
            console.log(data)
          }
        )
      })
    }
    
    showResults(data) {   
      this.elements.results.html('')
      
      if (data.length === 0) {
        this.showError('This beer was found in the database')
      } else {
        $('#error').remove()
        data.forEach((item) => {
          this.elements.results.append( `
          <div class = 'beer-wrapper'>
          <div class = "beer">
            <i class="fa fa-star" id="estrela" aria-hidden="true"></i>
            <h3 class="beer_name">${item.name}</h3>
            <img class ="beer_img" src = "${item.image_url}">
            <h4 class ="beer_tagline">${item.tagline}</h4>
            
           </div>
           <div class ="pop-up">
            <button type"submit" class="window-close-o bg-button" aria-hidden="true">X</button>
            <img class ="beer_img" src = "${item.image_url}">
            <div class="edita-pop">
              <h3 class ="title">Description</h3>
              <p>${item.description}</p>
              <h3 class ="title">Food Pairing</h3>
                <ul>
                 ${item.food_pairing
        .map(ingredient => `<li>${ingredient}</li>`)
        .join("")}
  
                </ul>
                </div>
            </div>
          </div>   
              `)
              $(".beer img").on("click", function () {
                $(this)
                  .closest(".beer-wrapper")
                  .find(".pop-up")
                  .fadeIn();
                $(".bg").fadeIn();
              });
          
              $(".window-close-o").on("click", function () {
                $(".pop-up").fadeOut();
                $(".bg").fadeOut();
              });
       })  
        /////////////// função ativa estrela favoritos

        const estrela = document.querySelectorAll('#estrela');
        const modalbox = document.querySelector('.boxmodalfav');
        function ativaFunc(event) {
          event.currentTarget.classList.toggle('ativa_estrela');
      
      
        let favStar = event.currentTarget.parentElement.parentElement;
        let newfavStar = favStar.cloneNode(true);
        modalbox.append(newfavStar);
        }
        estrela.forEach((link) => {
          link.addEventListener('click', ativaFunc);
        });
      
      
        let favoriteLink = document.querySelector('.favoriteLink');
        let pegamodal = document.querySelector('.modalfav');
        function ativaLink(){
          pegamodal.classList.add('ativo');
        }
        favoriteLink.addEventListener('click', ativaLink);
      
      
        const btnClose = document.querySelector('.btn-close-modal');
        btnClose.addEventListener('click', function() {
          pegamodal.classList.remove('ativo');
        });
      
      }
    }
  
    showError(message) {
      let alert = $('#error')
      
      if (alert.length === 0) {
        this.elements.form.before('<div class="alert alert-danger" id="error"></div>')
        alert = $('#error')
      }
  
      alert.text(message)
    }
  }
  
  const beerForm = new BeerSearch()
  
/////////////////////////////////////////////////////////////////////////


  if (request.status >= 200 && request.status < 400) {
    data.forEach(item => {
      let beerhtml =
        `
            <div class = 'beer-wrapper'>
            <div class = "beer">
              <i class="fa fa-star" id="estrela" aria-hidden="true"></i>
              <h3 class="beer_name">${item.name}</h3>
              <img class ="beer_img" src = "${item.image_url}">
              <h4 class ="beer_tagline">${item.tagline}</h4>
              
             </div>
             <div class ="pop-up">
              <button type"submit" class="window-close-o bg-button" aria-hidden="true">X</button>
              <img class ="beer_img" src = "${item.image_url}">
              <div class="edita-pop">
                <h3 class ="title">Description</h3>
                <p>${item.description}</p>
                <h3 class ="title">Food Pairing</h3>
                  <ul>
                   ${item.food_pairing
          .map(ingredient => `<li>${ingredient}</li>`)
          .join("")}
    
                  </ul>
                  </div>
              </div>
            </div>   
                `
      $(".beers").append(beerhtml);
    });

    $(".beer img").on("click", function () {
      $(this)
        .closest(".beer-wrapper")
        .find(".pop-up")
        .fadeIn();
      $(".bg").fadeIn();
    });

    $(".window-close-o").on("click", function () {
      $(".pop-up").fadeOut();
      $(".bg").fadeOut();
    });
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }


  


  /////////////// função ativa estrela favoritos

  const estrela = document.querySelectorAll('#estrela');
  const modalbox = document.querySelector('.boxmodalfav');
  function ativaFunc(event) {
    event.currentTarget.classList.toggle('ativa_estrela');


  let favStar = event.currentTarget.parentElement.parentElement;
  let newfavStar = favStar.cloneNode(true);
  modalbox.append(newfavStar);
  }
  estrela.forEach((link) => {
    link.addEventListener('click', ativaFunc);
  });


  let favoriteLink = document.querySelector('.favoriteLink');
  let pegamodal = document.querySelector('.modalfav');
  function ativaLink(){
    pegamodal.classList.add('ativo');
  }
  favoriteLink.addEventListener('click', ativaLink);


  const btnClose = document.querySelector('.btn-close-modal');
  btnClose.addEventListener('click', function() {
    pegamodal.classList.remove('ativo');
  });

 

}



request.send();






