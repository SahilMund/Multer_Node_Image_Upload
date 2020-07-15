const express = require("express");
const mongoose = require('mongoose');
const UserImage = mongoose.model("Multer");
const router = express.Router();
const upload  = require('../diskStorage')


// uploading single picture
router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index',{error:err.message})
        }
        else{
        console.log(req.file)
        if (!req.file) {
                res.render('index', {
                    msg: "error : no file selected"
                });
            } else {
                var imagefile=req.file.filename;
                var imageDetails=new UserImage({
                    imgname:imagefile
                });
                imageDetails.save((err,data)=>{
                        if(err) throw err;
                        res.render('index', {
                            msg: "File Uploaded Successfully...",
                            file: `uploads/${req.file.filename}`
                        });

                });
                
            }}
        });
});



module.exports=router;

