import mongoose from "mongoose";
const {Schema, model} = mongoose;

const serviceRequestSchema = new Schema({
    audioURL: {
        type: Object,
    },
    text:{
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    avatar: {
        type: String,
    }

})

serviceRequestSchema.method("toJSON", function () {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


serviceRequestSchema.set("autoIndex", true);

const serviceRequest = model("serviceRequest", serviceRequestSchema);

export default serviceRequest;




