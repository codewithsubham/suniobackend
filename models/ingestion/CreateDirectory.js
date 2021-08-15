const fs = require("fs");

class Directory
{

    static CreateDirectory(UserName)
    {

        if (!fs.existsSync("subham")) return fs.mkdirSync("subham");

        return true;

    }
}



module.exports = Directory;