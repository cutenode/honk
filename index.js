require('dotenv').config()
const fastify = require('fastify')({
  logger: true
})

// server so it'll run nicely on the Internet
fastify.get('/', function (request, reply) {
  reply.send('honk')
})

fastify.listen(process.env.PORT, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })

const token = process.env.DISCORD_TOKEN

client.on('ready', function () {
  console.log('the client becomes ready to start')
  console.log(`I am ready! Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', function (message) {
  console.log(`message is created -> ${message}`)
  if (message.content === 'honk' && message.author.bot === false) {
    console.log(`honking ${message.author} from ${client.user}`)
    message.channel.send('honk')
  } else if (message.author.bot === false) {
    console.log(`deleting non-honk message from ${message.author}`)
    message.delete()
  }
})

client.on('reconnecting', function () {
  console.log('client tries to reconnect to the WebSocket')
})

client.on('resume', function (replayed) {
  console.log(`whenever a WebSocket resumes, ${replayed} replays`)
})

client.on('warn', function (info) {
  console.log(`warn: ${info}`)
})

client.on('error', function (error) {
  console.error(`client's WebSocket encountered a connection error: ${error}`)
})

client.on('disconnect', function (event) {
  console.log('The WebSocket has closed and will no longer attempt to reconnect')
})

client.on('debug', function (info) {
  console.log(`debug -> ${info}`)
})

client.login(token)
