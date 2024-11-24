const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

const apiURL = "https://api.quotable.io/random";
const fallbackQuotes = [
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
];

async function getQuote() {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Failed to fetch the quote");
        }

        const data = await response.json();
        quoteElement.innerText =`"${data.content}"`;
        authorElement.innerText = `— ${data.author}`;
    } catch (error) {
        console.error(error);
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        const selectedQuote = fallbackQuotes[randomIndex];
        quoteElement.innerText = `"${selectedQuote.content}"`;
        authorElement.innerText = `— ${selectedQuote.author}`;
    }
}


function tweetQuote() {
    const quoteText = quoteElement.innerText;
    const authorText = authorElement.innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)} ${encodeURIComponent(authorText)}`;
    window.open(tweetURL, "_blank");
}


document.getElementById("new-quote").addEventListener("click", getQuote);
document.getElementById("tweet").addEventListener("click", tweetQuote);
document.addEventListener("DOMContentLoaded", getQuote);