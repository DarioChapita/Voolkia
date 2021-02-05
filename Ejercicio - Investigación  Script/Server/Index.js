const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

//Politicas Cors, Formatea a Json y Urlencoded codifica el identificador
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Consulta a la API
app.get("/api/search", (req, res) => {
  axios
    .get(
      `https://api.mercadolibre.com/sites/MLA/search?seller_id=${req.query.id}`
    )
    .then((result) => {
      let data = result.data.results.map((e) => {
        return {
          Id: e.id,
          Title: e.title,
          Category: e.category_id,
          CategoryName: e.domain_id,
        };
      });
      //escribo el archivo txt
      fs.writeFileSync("./Fs/prueba.txt", JSON.stringify(data), "utf8");
      res.send(data);
    });
});

//Ruta para leer el archivo txt que contiene las consultas a la API.
app.get("/read", (req, res) => {
  const data = fs.readFileSync("./Fs/prueba.txt", "utf8");
  res.send(JSON.parse(data));
});

//Se escucha en el puerto
app.listen(4000);
