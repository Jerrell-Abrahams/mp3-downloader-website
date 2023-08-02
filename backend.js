const express = require('express')
const app = express()
const ytdl = require('ytdl-core');
const fs = require("fs")
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));




  

app.get('/', async (req, res) => {

  const songInfo = await ytdl.getInfo("https://music.youtube.com/watch?v=WMGVnpaBE-I&feature=share")

  console.log(songInfo.related_videos[0].author.name)

  // console.log(songInfo.videoDetails.title)
  // console.log(songInfo.videoDetails.embed.iframeUrl)
  res.render("index", {songDetails: songInfo})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
