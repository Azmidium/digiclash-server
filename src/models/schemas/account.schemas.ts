import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  oauthID: String,
  display_name: String,
  emails: [String],
  question_sets: [String],
  plans: [Number]
});

export = AccountSchema;
