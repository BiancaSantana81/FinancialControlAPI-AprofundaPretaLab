import mongoose, { Schema } from "mongoose";

const purchaseItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const purchaseSchema = new Schema({
  cart: { type: [purchaseItemSchema], required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
