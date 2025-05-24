const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Did you hear about the claustrophobic astronaut? He just needed a little space.",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "How do you organize a space party? You planet!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call fake spaghetti? An impasta!"
];

module.exports = {
    name: 'joke',
    description: 'Tells a random joke',
    execute(message) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        message.reply(randomJoke);
    }
};