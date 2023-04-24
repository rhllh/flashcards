const proxy_config = [
    {
        context: [ '/**' ],
        target: 'https://rhllh-flashcards.up.railway.app',
        secure: false
    }
]

module.exports = proxy_config