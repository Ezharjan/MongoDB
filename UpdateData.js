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

//Update one relevant data
/*
Course.updateOne({
    _id: '5ee39374d3e2be08206a42a7'
}, {
    author: 'NewAuthor'
}).then(result => {
    console.log('the updated result is: ' + Object.keys(result));
});
*/

//Update all
Course.updateMany({}, {
    name: 'Alexander Ezharjan'
}).then(result => {
    console.log(`the updated result is : n = ${result.n}, nModified = ${result.nModified}, ok = ${result.ok}. `);
});