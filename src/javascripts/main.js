// Required by Webpack - do not touch
require.context('../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import 'bootstrap'

let suggested_books = []
function addBook(event) {
    event.preventDefault()
    let t = document.querySelector("#title").value
    let p = document.querySelector("#poster").value
    let a = document.querySelector("#author").value
    let d = document.querySelector("#description").value
    let y = document.querySelector("#year").value

    let books = getCards()

    if(t && p && a && d && y) {
        let book = { title: t, poster: p, author: a, description: d, year: y }
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    this.reset()
    displayCards()
}

function getCards() {
    if(localStorage.getItem('books') && localStorage.getItem("books") != '[]') {
        return JSON.parse(localStorage.getItem('books'))
    }
}

function displayBooks() {
    let cards = getCards()
    let cards_html = ''
    let ndx = 0
    for(let c of cards) {
        cards_html += `
        <div class="card col mb-3" data-ndx="${ndx}">
          <div class="row g-0">
              <div class="col-md-4">
              <img src="${c.poster}" class="card-img" alt="${c.poster}">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                  <h5 class="card-title">${c.title}</h5>
                  <p class="card-text">${c.author}</p>
                  <p class="card-text">${c.description}</p>
                  <p class="card-text">${c.year}</p>
                      <p class="card-text">
                          <button class="btn btn-danger to-delete">Delete</button>
                      </p>
                  </div>
              </div>
          </div>
      </div>
        `
      ndx++
    }

    document.querySelector("#cards").innerHTML = cards_html

    document.querySelectorAll('.to-delete').forEach(function(btn) {
      btn.onclick = function(event) {
          if(confirm("Are you sure you want to delete this card?")) {
              cards.splice(event.target.closest('.col').dataset.ndx, 1)
              localStorage.setItem("cards", JSON.stringify(cards))
              displayCards()
          }
      }
    })

    hideForm()
}
