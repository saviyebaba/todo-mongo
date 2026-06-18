import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true
    },

    classe: {
        type: String,
        required: true
    }

});

export default mongoose.models.Student ||
mongoose.model("Student", StudentSchema);