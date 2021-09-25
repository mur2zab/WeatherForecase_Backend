const bootstrap = require('./bootstrap.js');
const config = require('./config');
bootstrap.init(config).then( ()=> {
    require("./api")
}).catch((err) => {
    console.log(err);
    process.exit(0);
});


