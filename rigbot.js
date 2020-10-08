#!/usr/bin/env node

const net = require('net')
const discord = require('discord.js')
const application = require('commander')
const config = require('./config.json')

const client = new discord.Client()

application
    .version('1.0.0')
    .name('rigbot')
    .description('A simple Discord bot to remote control the Hamlib TCP rig control daemon rigctld')
    .option('-t,--token [Bot token]', 'Discord Bot token', config.BOT_TOKEN)
    .option('-i,--ip [IP address]', 'IP address of your rigctld server', config.RIGCTLD_IP)
    .option('-p,--port [TCP port]', 'TCP port of your rigctld server', config.RIGCTLD_PORT)
    .parse(process.argv)

const { ip, port, token } = application

client.on('message', function (message) {
    if (message.author.bot) return
    if (!message.content.startsWith(config.BOT_PREFIX)) return

    let command = message.content.slice(config.BOT_PREFIX.length + 1)
    let conn = new net.Socket()

    conn.connect(port, ip, () => {
        conn.write(command + '\n')
    })

    conn.on('data', (data) => {
        message.channel.send(data.toString('utf-8'))
        conn.destroy()
    })

    conn.on('error', () => {
        console.error('Unable to connect to rigctld.')
        message.channel.send('Unable to connect to rigctld.')
    })
})

client.login(token).catch((err) => {
    console.error("Unable to connect to Discord. Please check your Discord Bot Token.")
    console.error(err)
    process.exit(1)
})
