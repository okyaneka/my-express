import validator from "~/helpers/validator";

export const SampleParamsValidator = validator.generate({
  page: validator.number({ defaultValue: 1 }),
  limit: validator.number({ defaultValue: 10 }),
  search: validator.string({ allow: "", defaultValue: "" }),
});
