const express = require('express')
const app = express()
const ytdl = require('ytdl-core');
const fs = require("fs")
const axios = require('axios');
const https = require("https");
var search = require('youtube-search');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



var opts = {
  maxResults: 3,
  key: "AIzaSyC_5kOz87VLstAVRTnTWCUynGd0_rY1GaA"
};









const port = process.env.PORT || 3000


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



app.get('/', async (req, res) => {
  res.render("index_without_ejs", {link: ""})
})

app.post("/", async (req, res) => {
  
  const videoId = req.body.search
  console.log(videoId)

  search(videoId, opts, async function(err, results) {
    if(err) return console.log(err);
  
    console.dir(results);
    var videoLink = results[0].link
    const searched_videos = results

    const songInfo = await ytdl.getInfo(videoLink)

    res.render("index", {songDetails: songInfo, videos: searched_videos})
  });





})

app.post('/convert_mp3', async (req, res) => {

  const videoId = req.body.videoID
  console.log(videoId)


  const fetchAPI = await fetch("https://youtube-mp36.p.rapidapi.com/dl?id=" + videoId, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": '36410dff50msh6dc7a3cd892d33fp1e4e2ajsnb25fd6888dd0',
      "x-rapidapi-host": 'youtube-mp36.p.rapidapi.com'
    }
  })

  const fetchResponse = await fetchAPI.json()

  if (fetchResponse.status === "ok") {
    
    return res.redirect(fetchResponse.link)
  }
  else {
    return res.redirect("/")
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
