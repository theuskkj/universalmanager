const { runInContext } = require("vm");

module.exports = {
    name: "youtube",
    description: "view a yt channel",

    async run(client, message, args) {
        message.channel.send("https://www.youtube.com/channel/UCdl7FI572r5QXVYzDMLH0ug")
    }
}