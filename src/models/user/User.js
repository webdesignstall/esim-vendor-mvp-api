const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		validate: [validator.isEmail, "Provide a valid Email"],
		trim: true,
		lowercase: true,
		required: [true, "Email address is required"],
		unique: true
	},

	name: {
		type: String,
		required: [true, 'First name is required'],
		minLength: [3, 'First name must be 3 character'],
		maxLength: [100, 'First name is too large'],
		trim: true,
		lowercase: true
	},
	website: {
		type: String,
	},
	contact: {
		type: String,
	},
	headOffice: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		validate:{
			validator: (value)=>
				validator.isStrongPassword(value, {
					minLength: 8,
					minUppercase: 1,
					minNumbers: 1,
					minSymbols: 1,
					minLowercase: 1
				}),
			message: 'Please provide a strong password'
		}
	},
	confirmPassword: {
		type: String,
		required: [true, 'Confirm Password is required'],
		validate: {
			validator: function(value){
				return value === this.password
			},
			message: 'Password does not match'
		}
	},
	status: {
		type: String,
		enum: ['active', 'inactive', 'blocked'],
		default: 'active'
	},

	verified: {
		type: Boolean,
		default: true
	},
	avatar: {
		type: String
	},
	role: {
		type: String,
		enum: ['user', 'admin', 'superadmin'],
		default: 'user'
	},

}, {versionKey: false, timestamps: true});

userSchema.pre('save', function(next){
	if(!this.isModified('password')){
		return next();
	}
	
	const password = this.password;
	this.password = bcrypt.hashSync(password);
	this.confirmPassword = undefined;
	next();
});


userSchema.methods.comparePassword = function(password, hash){
	return bcrypt.compareSync(password, hash);
}

userSchema.methods.hashPassword = function(password){
	return bcrypt.hashSync(password);
}


const User = mongoose.model('User', userSchema);

module.exports = User;

