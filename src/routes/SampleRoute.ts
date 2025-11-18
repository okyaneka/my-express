import { Router } from "express";
import response from "~/helpers/response";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { SampleParamsValidator } from "~/validators/sample-validator";

const SampleRoute = Router();

const PATH = { INDEX: "/", QUERY: "/query" } as const;

SampleRoute.get(PATH.INDEX, async (req, res) => {
  const { value } = SampleParamsValidator.validate(req.query);

  res.json(response.success("SampleRoute"));
});

SampleRoute.get(
  PATH.QUERY,
  ValidationMiddleware({ query: SampleParamsValidator }),
  async (req, res) => {
    const { value } = SampleParamsValidator.validate(req.query);

    res.json(response.success("SampleRoute Query: " + JSON.stringify(value)));
  }
);

export default SampleRoute;
