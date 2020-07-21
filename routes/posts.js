const express = require("express");
//const fileupload = require("express-fileupload");

const router = express.Router();
//const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken');
//const Speakeasy = require("speakeasy")
//const nodemailer = require('nodemailer');
//const Razorpay = require("razorpay");
const request = require('request');

const Restaurant = require("../models/Restaurant");
//router.use(fileupload)


const multer = require('multer');
// file store the perticular folder
//const upload = multer({ dest: './uploads' })  // first time these code use

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
//    console.log(file)
    cb(null, './uploads');  // file store the "uploads" folder
  },
  filename: function(req, file, cb) {
//    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);  // change file name date+filename
  }
});

// file filter code
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/vnd.microsoft.icon' || file.mimetype === 'application/pdf' )
  {
//    console.log('test1')
    cb(null, true);
  } else {
//    console.log('test2')
    cb(null, false);
  }
};

// allow the 10 mb file uploaded
const upload = multer({
  storage: storage
}).array('uploadedImages',10);

// getting  data in the post table
router.post('/res_add', (req, res, next)=>{
   console.log(req.body)
    const newRestaurant = new Restaurant({
        name: req.body.name,
        city: req.body.city
    })
    //console.log(newUser);
    newRestaurant.save(err => {
        if (err) {
            return res.status(400).json({
                title: "error",
                error: err
            })
        }
        return res.status(200).json({
            title: "stored successfull",
            res_id: newRestaurant._id
        })
    })
})

//router.post('/res_add_image', (req, res, next) => {
//  try {
//      console.log('Rahul Pawar')
//      console.log(req.body)
//
//      var file = req.file.path;
//      console.log('test: ', file)
//      console.log(JSON.stringify(req.body.uploadedImages))
//      console.log(JSON.parse(req.body.uploadedImages))
//
//      res.end();
//    var myquery = { _id: req.body.res_id};
//    console.log(req.file.path)
//    var newvalues = { $set: { image1: req.file.path, featured: req.body.featured, top: req.body.top }};
//    Restaurant.updateOne(myquery, newvalues, function(err, res) {
//      if (err) throw err;
//      else {
//        // console.log("Banner Uploaded..");
//      }
//    });
//    return res.status(200).json({
//      title: "images File Uploaded.."
//    })
//  } catch (err) {
//    res.status(404).json({
//      title: 'not add images'
//    })
//  }
//
//})


router.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        Restaurant.find({_id: req.body.res_id},(err, result) => {
          if (err) throw err;
          var t = JSON.stringify(result)
          console.log(result)
//          const in = JSON.parse(t)
          let v = JSON.parse(t)
          for (let i = 0; i < req.files.length; i++) {
              v[0]["image"+i] = req.files[i].path
          }
          console.log(v[0])
          console.log('test 4 : ', t)
          Restaurant.updateOne({_id: req.body.res_id}, { $set: v[0]}, function(err, res) {
          if (err) throw err;
          else {
            console.log("Banner Uploaded..");
            console.log(res);
          }
          });
          return res.status(200).json({
            title: 'Image uploaded'
          })
        });
    });
});

// getting categories information inside the categories collection
router.post('/restaurant_data', (req, res) => {
  try {
    console.log("test", req.body)
    const query = req.body
    Restaurant.find(query, (err, result) => {
      if (err) throw err;
      console.log(result);
      return res.status(200).json({
        result: result
      })
    })

  }
  catch (err) {
    res.status(404).json({
      "error": err
    })
  }
})

router.post('/restaurant_data_delete', (req, res) => {
  try {
    console.log("test", req.body)
    const query = req.body
    Restaurant.deleteOne(query, (err, result) => {
      if (err) throw err;
      console.log("1 document deleted");
      return res.status(200).json({
        title: "1 document deleted"
      })
    })

  }
  catch (err) {
    res.status(404).json({
      "error": err
    })
  }
})

module.exports = router;
