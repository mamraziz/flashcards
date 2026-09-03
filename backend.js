const term = document.getElementById("term");
const definition = document.getElementById("definition");
const post = document.getElementById("post");

post.addEventListener("click", () => {
    fetch('http://192.168.1.6:3000/flashcards/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: term.value, definition: definition.value })
    })
    .then(res => res.text())
    .then(message => console.log(message));
    console.log("pressed");
});





