const { ConnectionBase } = require('mongoose')

const mongoose = require('mongoose');

mongoose.connect(
        'mongodb://localhost/playground', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => { console.log('数据库连接成功！') })
    .catch(err => { console.log(err, '数据库连接失败！') });



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);


//Search all ===> RETURN A LIST
/*
Course.find()
    .then((result) => {
        console.log('the found result is: ' + result);
        // console.log('the found result is: ' + typeof result); //object
        // console.log('the found result is: ' + result[0]);
    }).catch(err => {
        console.log('error happened: ' + err);
    });

    */

//Search relavant ===> RETURN A LIST
Course.find({
    _id: '5ee37619203cc54e4486f2a1'
}).then(result => {
    console.log(result);
});