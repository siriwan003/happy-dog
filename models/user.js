import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        trim: true,
        required: [true, "firstname required."],
        maxLenght: [50,"max 50 charater."]
    },
    lastname:{
        type: String,
        trim: true, 
        required: [true, "lastname required."],
        maxLenght: [50,"max 50 charater."]
    },
     phonenumber:{
        type: String,
        required: [true, "phonnumber required."],
        maxLenght: [10,"max 10 charater."]
    },
    email:{
        type: String,
        required: [true, "password required."],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"],
        maxLenght: [50,"max 50 charater."]
    },
    password:{
        type: String,
        required: [true, "password required."],
        minlength: 8,
        maxLenght: [50,"max 50 charater."]
    },
    role:{
        type: String,
        enum: ["user","admin"], 
        default: "user"
    },
    isActive: {
        type: Boolean, default: true, index: true
    }
},{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password
            delete ret.__v
            return ret

        },
    },
    toObject: { virtuals: true},
}
)

userSchema.index({email:1}, { unique: true})
userSchema.index({phonenumber:1}, { unique: true})

// userSchema.pre("findOneAndUpdate", async function (pnext) {
//     const update = this.getUpdate()
//     const nextPwd =
//         update?.password ??
//             (update?.$set&&
//             Object.prototype.hasOwnProperty.call(update.$set, "password")
//         ? update.$set.password
//         : undefined)

//     if (!nextPwd) return nextPwd()
//     const hashed = await argon2d.hash(nextPwd, { type: argon2.argon2id })
//     if (update.$set) update.$set.password = hashed
//     else update.password = hashed

//     next()
// })

userSchema.methods.verifyPassword = async function (candidate) {
    if (!this.password)
        throw new error("Password hash not selected; use .select('+password')")
}  

export default mongoose.model("User", userSchema)