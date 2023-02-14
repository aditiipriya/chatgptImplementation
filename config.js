require('dotenv').config({ debug: process.env.DEBUG });

let cfg = {
        basepath: process.env.HOMEPATH,
        projectName: process.env.PROJECT_NAME,
        environment: process.env.NODE_ENV,
        debug: process.env.DEBUG,
        port: process.env.PORT,
        TAG: process.env.NODE_ENV,
        openaikey:process.env.OPEN_AI_KEY
}

module.exports = {
        cfg
}
