import { ZodError } from 'zod';

export function validateData(schema, targets = ['body']) {
  return (req, res, next) => {
    try {
      targets.forEach((target) => {
        if (target in req) {
          const validatedData = schema.parse(req[target]);
          req[target] = validatedData;
        }
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(422).json({ errors: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
