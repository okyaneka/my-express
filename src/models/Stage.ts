import mongoose, { ToObjectOptions } from "mongoose";

export interface Stage {
  id: string;
  name: string;
  storyline: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toObjectOptions: ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

const stageSchema = new mongoose.Schema<Stage>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

stageSchema.virtual("id").get(function () {
  return this._id.toString();
});
stageSchema.set("toObject", toObjectOptions);
stageSchema.set("toJSON", toObjectOptions);

const Stage = mongoose.model<Stage>("Stage", stageSchema);

export default Stage;
