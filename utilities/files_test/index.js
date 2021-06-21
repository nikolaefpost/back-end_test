const s3 = require('s3')
const express = require('express');
const path = require('path');

// import s3 from 's3';
// import express from 'express';
// import path from 'path'


let app = express();
app.use(express.static(path.join(__dirname, '/public')))


var client = s3.createClient({
    maxAsyncS3: 20,
    s3RetryCount: 3,
    s3RetryDelay: 1000,
    multipartUploadThreshold: 20971520,
    multipartUploadSize: 15728640,
    s3Options: {
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    },
});
var params = {
    localFile: "files/home_uk.mp4",

    s3Params: {
        Bucket: "videos",
        Key: "step_video.mp4",
    },
};
var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
        uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
    console.log("done uploading");
});

app.listen(80, ()=> console.log('server working...'))