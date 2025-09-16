import mongoose from 'mongoose'

const cagatoryCommuSchema = new mongoose.Schema({
  ctgycommuname: {
    type: String,
    required: [true, "cagatorycommunityname required."],
    maxlength: [50, "max 50 characters."]
  }
})

export default mongoose.model("Cagatorycommu", cagatoryCommuSchema)

