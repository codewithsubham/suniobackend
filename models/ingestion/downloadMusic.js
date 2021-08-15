
const wget = require('wget');
const ErrorDescription = require('../Error');
const Directory = require("./CreateDirectory")



const downloadMusic = (musicName, mediaLink, res) =>
{
    /**
     * downloadMusic is function that donwloads the music from
     * the internet using wget-download library
     */


    const UserName = "subham"; // temp varaible;

    try
    {
        Directory.CreateDirectory(UserName);
        var download = wget.download(mediaLink, UserName + "/" + musicName, {});

    } catch (error)
    {
        throw ErrorDescription.DOWNLOAD_FAILED;
    }





    download.on('error', function (err)
    {
        console.log(err);
        res.end(`data: ${getPayLoad(true, false, 0, false)}\n\n`);
    });
    download.on('start', function (info, e)
    {
        console.log(info, e, "started");
        res.write(`data: ${getPayLoad(false, true, 0, false)}\n\n`);
    });
    download.on('end', function (output)
    {
        // res.write(`data: completed\n\n`);
        res.end(`data: ${getPayLoad(false, false, 0, true)}\n\n`);
    });
    download.on('progress', function (progress)
    {
        typeof progress === 'number'
        console.log(progress)
        res.write(`data: ${getPayLoad(false, true, progress.toFixed(3), false)}\n\n`);
        // code to show progress bar
    });
}


let getPayLoad = (err, started, pertentage, completed) =>
{

    return JSON.stringify({
        err: err,
        started: started,
        pertentage: pertentage,
        completed: completed
    });

}

module.exports = downloadMusic;