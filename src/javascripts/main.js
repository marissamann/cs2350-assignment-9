// Required by Webpack - do not touch
require.context('../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import 'bootstrap'

function addCard(event) {
    event.preventDefault()
    let t = document.querySelector("#title").value
    let p = document.querySelector("#poster").value
    let a = document.querySelector("#author").value
    let d = document.querySelector("#description").value
    let y = document.querySelector("#year").value

    let cards = getCards()

    if(t && p && a && d && y) {
        let card = { title: t, poster: p, author: a, description: d, year: y}
        cards.push(card)
        localStorage.setItem('suggested_books', JSON.stringify(cards))
    }

    this.reset()
    displayCards()
}

function getCards() {
    if(localStorage.getItem('suggested_books') && localStorage.getItem("suggested_books") != '[]') {
        return JSON.parse(localStorage.getItem('suggested_books'))
    }
}

function displayCards() {
    let cards = getCards()
    let cards_html = ''
    let ndx = 0
    for(let c of cards) {
        cards_html += `
        <div class="card col mb-3" data-ndx="${ndx}">
        <h3>Book Suggestions</h3>
          <div class="row g-0">
              <div class="col-md-4">
              <img src="${c.poster}" class="card-img" alt="picture">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                  <h5 class="card-title">${c.title}</h5>
                  <p class="card-text">${c.author}</p>
                  <p class="card-text">${c.description}</p>
                  <p class="card-text">${c.year}</p>
                  </div>
              </div>
          </div>
      </div>
        `
      ndx++
    }

    document.querySelector(".cards").innerHTML = cards_html
}
document.querySelector("#myForm").onsubmit = addCard
displayCards()
