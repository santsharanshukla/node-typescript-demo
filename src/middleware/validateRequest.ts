import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e) {
      if (e instanceof Error) {
        console.log("in validation", e)
        return res.status(400).send(e.message);
      }
    }
  };

export default validate;
