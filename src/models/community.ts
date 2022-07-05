import { Document, model, Schema } from "mongoose";

const OrderChannelSchema = new Schema({
  name: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["buy", "sell", "mixed"],
  },
});

const usernameIdSchema = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, trim: true },
});

export interface CommunityInput {
  name: string;
  creator_id: string;
  group: string;
  order_channels: [string];
  fee: number;
  earnings: number;
  orders_to_redeem: number;
  dispute_channel: string;
  solvers: [string];
  banned_users: [string];
  public: boolean;
  currencies: [string];
}

export interface CommunityDocument extends CommunityInput, Document {
  created_at: Date;
}

const CommunitySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  creator_id: { type: String },
  group: { type: String }, // group Id or public name
  order_channels: {
    // array of Id or public name of channels
    type: [OrderChannelSchema],
  },
  fee: { type: Number },
  earnings: { type: Number }, // Sats amount to be paid to the community
  orders_to_redeem: { type: Number }, // Number of orders calculated to be redeemed
  dispute_channel: { type: String }, // Id or public name, channel to send new disputes
  solvers: [usernameIdSchema], // users that are dispute solvers
  banned_users: [usernameIdSchema], // users that are banned from the community
  public: { type: Boolean, default: true },
  currencies: {
    type: [String],
    required: true,
  },
  created_at: { type: Date },
});

export default model<CommunityDocument>("Community", CommunitySchema);
