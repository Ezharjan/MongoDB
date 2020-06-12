const { ConnectionBase } = require('mongoose')

const mongoose = require('mongoose');
const { ResumeToken, Int32 } = require('mongodb');

mongoose.connect(
        'mongodb://localhost/playground', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => { console.log('数据库连接成功！') })
    .catch(err => { console.log(err, '数据库连接失败！') });


//Use verification to define the rules
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,//default warning
        required: [true, 'Please enter the title of the book!'], //add customized warnings
    },
    // author: String,
    author: {
        type: String,
        minlength: 5, // for string only
        maxlength: [13, 'Customized warnings here.'] // for string only
    },
    price: {
        type: Number,
        min: 20, // for numbers
        max: 1000 // for numbers
    },
    name: {
        type: String,
        trim: true //delete the start&end-space of a string
    },
    isPublished: Boolean,
    publishedDate: {
        type: Date,
        default: Date.now // use current time if the date is not set
    }
});

const VerificationNeededElement = mongoose.model('VerificationNeededElement', courseSchema);

VerificationNeededElement.create({
    title: 'null',
    // author: 'Aleqwerrttyuquirewyuiiuyewrquiskjd',
    author: 'Ezharjan',
    name: '   Ezharjan Alexander   ',
    price: 22
}).then(result => {
    console.log('the result is : ' + result);
});