import { fetchGreeting } from "../../clients/greetingClient.js";
import { fetchPerson } from "../../clients/personClient.js";

export const greet = async (req, res, next) => {
  try {
    let acceptedLanguages = req.headers["accept-language"]?.split(",") || [];
    acceptedLanguages.map((lang) => lang.split(";")[0].trim().toUpperCase()); // Normalize languages

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
