"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    oauthID: String,
    display_name: String,
    emails: [String],
    question_sets: [String],
    plans: [Number]
});
module.exports = AccountSchema;
//# sourceMappingURL=account.schemas.js.map