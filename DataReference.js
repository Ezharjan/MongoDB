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




const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the title of the book!'], //add customized warnings
    },
    author: {
        type: String,
        minlength: 5, // for string only
        maxlength: [33, 'The auther-name-length exceeds the max length.'] // for string only
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
        enum: {
            values: ['Science', 'Computer', 'Literature', 'Art'],
            message: 'The type is not among the enum. '
        }
    },
    utilization: {
        type: String,
        validate: {
            validator: v => {
                return v && v.length > 10;
            },
            message: 'the input value is invalid.'
        }
    }
});


const authorSchema = new mongoose.Schema({
    // authorName: {
    //     type: String,
    //     required: [true, 'Please enter the name of the author!']
    // },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authorInfo'
    },
    authorSex: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Please enter the gender of the author'
        }
    },
    authorBirth: {
        type: Date,
        default: Date.now
    }
});


const bookInfo = mongoose.model('bookInfo', bookSchema);
const authorInfo = mongoose.model('authorInfo', authorSchema);

////1.
// bookInfo.create({
//     title: 'Not yet defined',
//     author: 'Alexander Ezharjan',
//     name: '   FullStack Development   ',
//     price: 99,
//     bookCategory: 'Computer',
// }).then(result => {
//     console.log('the result is : ' + result);
// }).catch(error => {
//     const err = error.errors;
//     //Get all the error messages
//     for (let attr in err) {
//         console.log(err[attr]['message']);
//     }
// });


////2.
// authorInfo.create({
//     authorName: '5ee436705cfb2529a0e63bf0',
//     authorSex: 'male'
// }).then(result => {
//     console.log('the result is: ' + result);
// }).catch(error => {
//     console.log('error happened: ' + error);
// });

authorInfo.find().populate('authorName')
    .then(result => {
        console.log('the referenced result is: ' + result);
    });