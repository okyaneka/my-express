import { RequestHandler } from "express";
import { Schema } from "joi";
import response from "~/helpers/response";

type Validators = {
  body?: Schema;
  query?: Schema;
};

const ValidationMiddleware =
  ({ body, query }: Validators): RequestHandler =>
  (req, res, next) => {
    if (query) {
      const { error } = query.validate(req.query, { abortEarly: false });

      if (error) {
        const validation = error.details.reduce((car, cur) => {
          return { ...car, [cur.context?.key as string]: cur.message };
        }, {});
        res
          .status(400)
          .json(response.error("validation_error", 400, { validation }));
        return;
      }
    }

    if (body) {
      const { error } = body.validate(req.body, { abortEarly: false });

      if (error) {
        const validation = error.details.reduce((car, cur) => {
          return { ...car, [cur.context?.key as string]: cur.message };
        }, {});
        res
          .status(400)
          .json(response.error("validation_error", 400, { validation }));
        return;
      }
    }

    next();
  };

export default ValidationMiddleware;
