// required dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

// env file
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// module
const validate = require("./middleware/validate");
const validatePosts = require("./schema/validatePosts");
const validateComment = require("./schema/validateComment");
const MongoUtil = require("./MongoUtil");
const { ObjectId } = require("mongodb");

// initialize express
const app = express();

// enable forms
app.use(express.urlencoded({ extended: true }));
// enable json data
app.use(express.json());
// enable cross site origin resources sharing
app.use(cors());

async function main() {
  const db = await MongoUtil.connect(MONGO_URI, "astroHunting");
  console.log("Connected to database");

  // routes
  //  return all database posts
  app.get("/getPosts", async function (req, res) {
    try {
      let results = await db.collection("astroHunting_posts").find().toArray();
      res.status(201);
      res.send(results);
    } catch (e) {
      res.status(500);
      res.send("Sever error. Please contact adminstrator");
    }
  });
  // return search database posts
  app.get("/getPosts/search", async function (req, res) {
    try {
      let criteria = {};
      // find by userName
      if (req.query.userName) {
        criteria["userName"] = {
          $regex: req.query.userName,
          $options: "i",
        };
      }
      // find by type
      if (req.query.typeOfAstrography) {
        criteria["typeOfAstrography"] = {
          $regex: req.query.typeOfAstrography,
          $options: "i",
        };
      }
      // find by array of string
      if (req.query.calibrationFrame) {
        criteria["calibrationFrame"] = {
          $in: [req.query.calibrationFrame],
        };
      }
      // find by lat/long
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
    } catch (e) {
      res.status(500);
      res.send("Sever error. Please contact adminstrator");
    }
  });
  // add new post
  app.post("/createPosts", validate.validate(validatePosts.postSchema), async function (req, res) {
      try {
        let userName = req.body.userName;
        let imageUrl = req.body.imageUrl;
        let description = req.body.description;
        let typeOfAstrography = req.body.typeOfAstrography;
        let equipment = req.body.equipment;
        let processingData = req.body.processingData;
        let calibrationFrame = req.body.calibrationFrame;
        let location = req.body.location;
        let dateTime = req.body.dateTime
          ? new Date(req.body.dateTime)
          : new Date();

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
      } catch (e) {
        res.status(500);
        res.send("Sever error. Please contact adminstrator");
      }
    }
  );
  // update post
  app.put("/updatePosts/:_id", async function (req, res) {
      try {
        let userName = req.body.userName;
        let imageUrl = req.body.imageUrl;
        let description = req.body.description;
        let typeOfAstrography = req.body.typeOfAstrography;
        let equipment = req.body.equipment;
        let processingData = req.body.processingData;
        let calibrationFrame = processCheckbox(req.body.calibrationFrame);
        let location = req.body.location;
        let dateTime = req.body.dateTime 
          ? new Date(req.body.dateTime)
          : new Date();

        let results = await db.collection("astroHunting_posts").updateOne(
          {
            _id: ObjectId(req.params._id),
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
              dateTime: new Date(dateTime),
            },
          }
        );
        res.status(200);
        res.json(results);
      } catch (e) {
        res.status(500);
        res.send("Sever error. Please contact adminstrator");
      }
    }
  );
  // delete post
  app.delete("/deletePosts/:_id", async function (req, res) {
    try {
      let results = await db.collection("astroHunting_posts").deleteOne({
        _id: ObjectId(req.params._id),
      });
      res.status(200);
      res.json({ status: "Deleted" });
    } catch (e) {
      res.status(500);
      res.send("Sever error. Please contact adminstrator");
    }
  });
  // get all comments 
  app.get("/comment", async function (req, res) {
    try {
      let results = await db.collection("astroHunting_posts")
      .find({
        comments: {$exists: true}
      },{
        projection: {comments: 1}
      })
      .toArray()
      res.json(results)
    } catch (e) {
      res.status(500)
      res.send("Sever error. Please contact adminstrator");
    }
  })
  // create new comment
  app.post("/comments/:posts_id:", async function (req, res){
    try {
      let _id = new ObjectId();
      let comment = req.body.comment
      let date_of_comment = req.body.date_of_comment
      ? new Date(req.body.date_of_comment)
      : new Date();

      await db.collection("astroHunting_posts").updateOne({
        _id: ObjectId(req.params.astroHunting_posts._id)
      },{
        $push:{
          comment: {_id,comment,date_of_comment}
        }
      })
      res.send("New comment added")
    } catch (e) {
      res.status(500)
      res.send("Sever error. Please contact adminstrator");
    }
  })
}
main();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
