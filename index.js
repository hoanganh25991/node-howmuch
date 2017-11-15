const app = require("./dist/index")

// START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens on port ' + port);
