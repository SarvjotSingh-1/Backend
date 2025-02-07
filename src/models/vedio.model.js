import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedioSchema = new Schema(
  {
    vedioFile: {
      type: String, //cloudinary ki service use krni h
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary ki service use krni h
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //in seconds jo ki cloudinary se aaye ga
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

vedioSchema.plugin(mongooseAggregatePaginate);
export const Vedio = mongoose.model("Vedio", vedioSchema);
