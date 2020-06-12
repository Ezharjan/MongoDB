const { ConnectionBase } = require('mongoose')

const mongoose = require('mongoose');
const { ResumeToken } = require('mongodb');

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

const Course = mongoose.model('Test', courseSchema);


//Delete the relevant one datum
/*
Course.findOneAndDelete({
    _id: '5ee37c5ffd4f4f0694be9075'
}).then(result => {
    console.log(result);
});
*/

//Delete all
Course.deleteMany({}).then(result => {
    console.log('deleted, result is: ' + Object.keys(result));
});