import { Request, Response, NextFunction } from "express-serve-static-core"

import { fetchGreeting } from "../../clients/greetingClient.ts";
import { fetchPerson } from "../../clients/personClient.ts";

export const greet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let acceptedLanguages = req.headers["accept-language"]?.split(",") || [];
    acceptedLanguages = acceptedLanguages.map((lang) => lang.split(";")[0].trim().toUpperCase().replace(/-/g, "_")); // Normalize languages

    const id = req.query.personID || req.params.personID;

    const [greetingResponse, personResponse] = await Promise.all([
      fetchGreeting(acceptedLanguages),
      fetchPerson(id),
    ]);

    res.status(200).json({
      data: {
        language: greetingResponse.language,
        greeting: greetingResponse.greeting,
        audience: personResponse.name
      },
    });
  } catch (error) {
    next(error);
  }
};
