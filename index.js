// required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
// env file
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
// module
const MongoUtil = require("./MongoUtil");
const { ObjectId } = require("mongodb");
// initialize express
const app = express();

// enable us to send post request
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// enable cross site origin resources sharing
app.use(cors());
// enable forms
app.use(express.urlencoded({ extended: true }));
// enable json data
app.use(express.json());

// just one checkboxes for validation no need for module
function processCheckbox(checkboxes) {
  let values = checkboxes;
  if (!values) {
    values = [];
  } else if (Array.isArray(values) == false) {
    values = [values];
  }
  return values;
}

async function main() {
  const db = await MongoUtil.connect(MONGO_URI, "astroHunting");
  console.log("Connected to database");

  // routes
  app.get("/getPosts", async function (req, res) {
    let criteria = {};

    if (req.query.userName) {
      criteria["userName"] = {
        $regex: req.query.userName,
        $options: "i",
      };
    }

    if (req.query.typeOfAstrography) {
      criteria["typeOfAstrography"] = {
        $regex: req.query.typeOfAstrography,
        $options: "i",
      };
    }

    if (req.query.calibrationFrame) {
      criteria["calibrationFrame"] = {
        $in: [req.query.calibrationFrame],
      };
    }

    if (req.query.location) {
      criteria["location"] = {
        $or: [req.query.location],
      };
    }

    let results = await db
      .collection("astroHunting_posts")
      .find(criteria)
      .toArray();
    res.status(201);
    res.send(results);
  });
  app.post("/createPosts", async function (req, res) {
    let userName = req.body.userName;
    let imageUrl = req.body.imageUrl;
    let description = req.body.description;
    let typeOfAstrography = req.body.typeOfAstrography;
    let equipment = req.body.equipment;
    let processingData = req.body.processingData;
    let calibrationFrame = processCheckbox(req.body.calibrationFrame);
    let location = req.body.location;
    let dateTime = req.body.dateTime ? new Date(req.body.dateTime) : new Date();

    let result = await db.collection("astroHunting_posts").insertOne({
      userName: userName,
      imageUrl: imageUrl,
      description: description,
      typeOfAstrography: typeOfAstrography,
      equipment: equipment,
      processingData: processingData,
      calibrationFrame: calibrationFrame,
      location: location,
      dateTime: dateTime,
    });
    res.status(201);
    res.send(result);
  });
  app.put("/updatePosts/:id", async function (req, res) {
    let userName = req.body.userName;
    let imageUrl = req.body.imageUrl;
    let description = req.body.description;
    let typeOfAstrography = req.body.typeOfAstrography;
    let equipment = req.body.equipment;
    let processingData = req.body.processingData;
    let calibrationFrame = processCheckbox(req.body.calibrationFrame);
    let location = req.body.location;
    let dateTime = req.body.dateTime ? new Date(req.body.dateTime) : new Date();

    let results = await db.collection("astroHunting_posts").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          userName: userName,
          imageUrl: imageUrl,
          description: description,
          typeOfAstrography: typeOfAstrography,
          equipment: equipment,
          processingData: processingData,
          calibrationFrame: calibrationFrame,
          location: location,
          dateTime: dateTime,
        },
      }
    );
    res.status(200);
    res.json(results);
  });
  app.delete("/deletePosts/:id", async function (req, res) {
    let results = await db.collection("astroHunting_posts").deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200);
    res.json({ status: "Deleted" });
  });
}
main();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
