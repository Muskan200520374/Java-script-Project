const { Client } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client();
const prefix = '!';

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async (message) => {
    if (message.author.bot) return;

    // Check if the message starts with the prefix
    if (message.content.startsWith(prefix)) {
        const [command] = message.content.slice(prefix.length).split(' ');

        if (command === 'jokes') {
            const jokes = await fetchJokes(5);
            jokes.forEach((joke, index) => {
                message.channel.send(`Joke ${index + 1}: ${joke}`);
            });
        } else if (command === 'quotes') {
            const quotes = await fetchQuotes(5);
            quotes.forEach((quote, index) => {
                message.channel.send(`Quote ${index + 1}: "${quote}"`);
            });
        }
    } else {
        // Check if the message contains a greeting or farewell
        const lowerCaseContent = message.content.toLowerCase();
        if (lowerCaseContent.includes('hello')) {
            message.channel.send('Hello! How can I help you today?');
        } else if (lowerCaseContent.includes('bye')) {
            message.channel.send('Goodbye! Have a great day!');
        }
    }
});

async function fetchJokes(count) {
    const jokes = [];

    for (let i = 0; i < count; i++) {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        jokes.push(`${joke.setup} ${joke.punchline}`);
    }

    return jokes;
}

async function fetchQuotes(count) {
    const quotes = [];

    for (let i = 0; i < count; i++) {
        const response = await fetch('https://api.quotable.io/random');
        const quote = await response.json();
        quotes.push(quote.content);
    }

    return quotes;
}

client.login('MTE3ODE0NDMzMzM1NTAzNjcyMg.GyEKEx.GQ3xBw-cl6UebCZFDr-Q5J-EgW9VznTsnaFRb4');
