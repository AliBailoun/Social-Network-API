const { Schema, model } = require('mongoose')



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        username: {
            type: String,
            required: true
        }
    },
    // {
    //     reactions: [reactionSchema]
    // },
    {
        toJSON: {
            virtuals: true
        },
        id: false

    }
);


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Date.now
        }
    },
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        }
    },
    {
        username: {
            type: String,
            required: true
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)


reactionSchema.virtual('createdStamp').get(function () {
    return new Date.toLocaleDateString()
})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;



