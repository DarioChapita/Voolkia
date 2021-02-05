const fs = require("fs");

function ReadFile(cb) {
  //leo la peticion
  fs.readFileSync("./prueba.txt", "utf8", function (err, data) {
    if (err) {
      console.err(err);
    }
    cb(data);
  });
}

ReadFile(function (data) {
  console.log(data);
});
