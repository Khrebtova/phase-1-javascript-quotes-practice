getAllQuotes();
let list = document.getElementById("quote-list")
let allQuotes = []
function getAllQuotes(){
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(data => {
        allQuotes = data
        list.innerHTML = ''
        data.forEach(el => renderOneQuote(el))
    })
}

function renderOneQuote(quote) {
    // console.log(quote.likes)
    let card = document.createElement('li')
    card.className = 'quote-card'
    card.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span> ${quote.likes.length} </span></button>
            <button class='btn-danger'>Delete</button>
            <button class ='btn-edit'>EDIT</button>
            <button class ='btn-done'>Done Editing</button>
        </blockquote>
    `
    let p = card.querySelector(".mb-0")

    card.querySelector('.btn-danger').addEventListener('click', () => {
        card.remove()
        handleDelete(quote.id) 
    })
    card.querySelector('.btn-success').addEventListener('click', () => {
        handleLike(quote.id)
    })
    
    card.querySelector('.btn-edit').addEventListener('click', () => {
        p.contentEditable = true
        p.style.backgroundColor = 'gray'
    })
    card.querySelector('.btn-done').addEventListener('click', () => {
        p.contentEditable = false
        p.style.backgroundColor = 'white'
    })

    list.appendChild(card)
}

function handleDelete(id){
    fetch(`http://localhost:3000/quotes/${id}`, {
        method : "DELETE",
        headers: {
            "Content-type" : "application/json",
            Accept : "application/json"
        }
    })
    .then(res => res.json())
    .then(quote => console.log(quote))
}

function handleLike(id){
    let newLike = {"quoteId": id, "createdAt": Date.now()}
    console.log(newLike)
    fetch(`http://localhost:3000/likes`, {
        method : "POST",
        headers: {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
        body : JSON.stringify(newLike)
    })
    .then(res => res.json())
    .then(data => getAllQuotes())
}