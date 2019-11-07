module.exports = {
    host: process.env.NODE_ENV ==='production' ? process.env.HOST : process.env.LOCAL_HOST
}

// "start": "SET NODE_ENV=production && node server.js",
//     "server": "SET NODE_ENV=development && nodemon server.js --ignore client",