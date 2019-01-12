import mongoose from "mongoose";

import { AccountObj } from "./objects/account.objects";

import AccountSchema from "./schemas/account.schemas";

interface AccountModel extends AccountObj, mongoose.Document {}

const Account = mongoose.model<AccountModel>("Account", AccountSchema);

export = Account;
