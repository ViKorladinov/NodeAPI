var http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
  let formular =
    "<h3>Type in your ingredients to get all possible recipes:</h3>";
  formular += "<form action='/api' method='post'>";
  formular +=
    "<input type='text' name='value' placeholder='garlic,onions,e.g.'/>";
  formular += "<button type='submit' name='submit'>Search</button>";
  res.send(formular);
});

app.post("/api", (req, res) => {
  request(
    "http://www.recipepuppy.com/api/?q=" + req.body.value,
    (error, repsonse, body) => {
      let data = JSON.parse(body);
      let items = "";
      data.results.forEach(element => {
        items += "<p>---------------</p>";
        if (element.thumbnail.length > 0)
          items += "<img src=" + element.thumbnail + " alt='Smiley face' >";
        items += "<p>Name: " + element.title + "</p>Ingredients:<ul>";
        element.ingredients.split(",").forEach(element => {
          items += "<li>" + element + "</li>";
        });
        items += "</ul>";
      });
      res.send(items);
    }
  );
});

app.listen(8080, () => {
  console.log("Server běží na portu 8080");
});
