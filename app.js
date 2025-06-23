//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
const date = require(__dirname + "/date.js");
const _ = require("lodash");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
  title: String,
  post: String,
  date: String,
  kebabCaseTitle: String
}

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "We aim to be the best and most trusted place for news. Made by people who dare to challenge. Made for people who want clarity in an uncertain world. We take you to the heart of the stories that shape our world.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let blogPosts = [];

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  Post.find({}, function(err, postsList){
    console.log(postsList);
    if(!err){
      res.render("home", {"homeContent": homeStartingContent, "blogPosts":postsList});
    }else{
      console.log(err);
    }
  });
  
});

app.get("/about", function(req, res){
  res.render("about", {"aboutContent": aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {"contactContent": contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:postName", function(req, res){
  Post.findOne({_id:req.params.postName}, function(err, post){
    console.log(post);
    if(!err){
      res.render("post", {title: post.title, post:post.post});
    }else{
      res.render("post", {title: "Error", post:"No post found"});
      console.log(err);
    }
  });
  
  
});

app.post("/compose", function(req, res){
  const post = new Post({title: req.body.title, post:req.body.post, date: date.getDate(), kebabCaseTitle: _.kebabCase(req.body.title)});
  post.save(function(err, post, numAffected){
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
  });  

  
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
