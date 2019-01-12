import Plans from "../enums/plans.enums";

interface AccountObj {
  oauthID: string;
  display_name: string;
  emails: string[];
  question_sets: string[];
  plans: Plans[];
}

export { AccountObj };
