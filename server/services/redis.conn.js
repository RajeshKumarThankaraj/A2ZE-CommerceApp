const redis = require('redis')

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
})

// const start = async () => {
//     await redisClient.connect()
// }

redisClient.on('connect', () => {
    console.log('Redis client connected')
})

redisClient.on('ready', () => {
    console.log('Redis client connected and ready to use')
})

redisClient.on('error', (err) => {
    console.log(err.message)
})

redisClient.on('end', () => {
    console.log('Client disconnected')
})

process.on('SIGINT', () => {
    redisClient.quit()
})

// start()
module.exports = redisClient