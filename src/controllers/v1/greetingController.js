import { fetchGreeting } from "../../clients/greetingClient.js";
import { fetchPerson } from "../../clients/personClient.js";

export const greet = async (req, res, next) => {
  try {
    let acceptedLanguages = req.headers["accept-language"]?.split(",") || [];
    acceptedLanguages = acceptedLanguages.map((lang) => lang.split(";")[0].trim().toUpperCase().replace(/-/g, "_")); // Normalize languages

    const id = req.query.personID || req.params.personID;

    const subdomain = req.headers.host.split(".")[0];

    const [greetingResponse, personResponse] = await Promise.all([
      fetchGreeting(acceptedLanguages, { "x-feature-branch": subdomain }),
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
