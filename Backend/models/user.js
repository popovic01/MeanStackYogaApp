const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: [true, 'The email you entered already exists in database']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        lowercase: true,
        unique: [true, 'The username you entered already exists in database'],
        minlength: [5, 'Korisnicko ime mora imati bar 5 karaktera']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password must have at least 5 characters']
    },
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    role: {
        type: Number,
        default: 0,
    },
      address: {
        addr1: String,
        city: String,
        country: String,
        postalCode: String,
      },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
});

userSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, 'Email already exists!');

const User = mongoose.model('User', userSchema);
module.exports = User;
