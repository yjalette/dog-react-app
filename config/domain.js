module.exports = {
    host: process.env.NODE_ENV ==='production' ? process.env.HOST : process.env.LOCAL_HOST
}

