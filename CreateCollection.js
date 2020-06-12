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

const courseData = new Course({
    name: 'Alexander',
    author: 'Ezharjan',
    isPublished: true
});

courseData.save();