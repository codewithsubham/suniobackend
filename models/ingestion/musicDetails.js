

const http = require("https");
const ErrorDescription = require("../Error");
let getMusicInfo = (url) =>
{

    return new Promise((resolve, reject) =>
    {
        let request = http.get(url, function (response)
        {

            if (response.statusCode !== 200) return reject(ErrorDescription.LINK_ERROR);

            if (response.headers['content-type'] != 'audio/mpeg3') return reject(ErrorDescription.NOT_A_MUSIC);

            let musicInfo = decodeURIComponent(response.headers['content-disposition'].split("=")[1]);

            musicInfo = (musicInfo.includes('"') ? musicInfo.slice(1, -1) : musicInfo);

            return resolve(musicInfo);//decodeURIComponent(response.headers['content-disposition'].split("=")[1]));

        });
        //console.log(reject, "asdasd");
        request.on("error", err => reject(ErrorDescription.ENOTFOUND))
    })


}



module.exports = getMusicInfo;