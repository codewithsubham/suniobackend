const express = require("express");
const fs = require("fs");
const app = express();
const downloadMusic = require("./models/ingestion/downloadMusic");

const getMusicInfo = require('./models/ingestion/musicDetails');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


let port = process.env.PORT || 8080;

let server = app.listen(port, "0.0.0.0", () => console.log(`server started at ${port}`));


app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "text/event-stream");
    next();
});

const src = 'https://pagalfree.com/download/320-Dhoom%20Tara%20-%20Bell%20Bottom%20320%20Kbps.mp3';
const output = 'logo.mp3';

app.get("/", async (req, res) =>
{
    try
    {
        let musicInfo = await getMusicInfo(src);
        let downloadMusicStatus = downloadMusic(musicInfo, src, res);


    } catch (error)
    {
        res.end(`data: ${JSON.stringify({ err: true, errMessage: error })} \n\n`);

    }

})






app.get("/getToken", (req, res) =>
{

    console.log(req);

})