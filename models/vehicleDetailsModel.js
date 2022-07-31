import mongoose from "mongoose";
const {Schema, model } = mongoose;

const vehicleDetailsSchema  = new Schema({
    brandName: {
        type: String,
    },
    phone: {
        type: String,
    },
    year: {
        type: String,
    },
    registerNumber:{
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})


vehicleDetailsSchema.method("toJSON", function () {
    const {__v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

vehicleDetailsSchema.set("autoIndex", true);

const VehicleDetail = model("VehicleDetails", vehicleDetailsSchema);

export default VehicleDetail;


