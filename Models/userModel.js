const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter product name"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please Enter product number"],
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('Password is missing');

    try{
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error){
        console.log('error', error.message)
    }
}


const User = mongoose.model('User', userSchema);
module.exports = User;