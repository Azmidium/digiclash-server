"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const account_schemas_1 = __importDefault(require("./schemas/account.schemas"));
const Account = mongoose_1.default.model("Account", account_schemas_1.default);
module.exports = Account;
//# sourceMappingURL=account.models.js.map