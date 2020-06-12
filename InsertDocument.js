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

/*
//和数据库相关的所有操作都是异步操作
Course.create({
    name: 'Javascript',
    author: 'Alexander',
    isPublished: true
}, (err, result) => {
    err && console.log('error happened: ' + err) || console.log('succeeded to insert the document: ' + result);
});
*/


//Use Promise
Course.create({
    name: 'C#',
    author: 'Ezharjan',
    isPublished: true
}).then(result => {
    console.log('Inserted doument: ' + result);
}).catch(err => {
    console.log('Error happened: ' + err);
});