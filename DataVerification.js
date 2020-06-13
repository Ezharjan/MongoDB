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
    },
    bookCategory: {
        type: String,
        // enum: ['contentA', 'contentB', 'contentC', 'contentD']
        enum: {
            values: ['contentA', 'contentB', 'contentC', 'contentD'],
            message: 'The type is not among the enum. '
        }
    },
    customizedValidation: {
        type: String,
        validate: {
            validator: v => {
                return v && v.length > 10;
            },
            message: 'the input value is invalid.'
        }
    }
});

const VerificationNeededElement = mongoose.model('VerificationNeededElement', courseSchema);

VerificationNeededElement.create({
    title: null,
    // author: 'Aleqwerrttyuquirewyuiiuyewrquiskjd',
    author: 'Ezharjan',
    name: '   Ezharjan Alexander   ',
    price: 22,
    // bookCategory: 'my-own-content' //invalid content
    // bookCategory: 'contentA',
    bookCategory: 'java',
    // customizedValidation: 'abc12345678'
}).then(result => {
    console.log('the result is : ' + result);
}).catch(error => {
    // console.log('error happened: ' + error);

    const err = error.errors;
    //Get all the error messages
    for (let attr in err) {
        console.log(err[attr]['message']);
    }
});