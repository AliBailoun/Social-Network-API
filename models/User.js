const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    },
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Are you sure that is a valid email?"]
        }
    },
    {
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    },
    {
        friends: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);


userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;