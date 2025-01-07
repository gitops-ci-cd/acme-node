import { context } from "@opentelemetry/api";

import { fetchGreetingAsync, detectLanguage } from "../../clients/greetingClient.js";
import { fetchPersonAsync } from "../../clients/personClient.js";

export const greet = async (req, res, next) => {
  try {
    const activeContext = context.active();
    let acceptedLanguages = req.headers["accept-language"]?.split(",") || [];
    acceptedLanguages = acceptedLanguages.map((lang) => lang.split(";")[0].trim().toUpperCase().replace(/-/g, "_")); // Normalize languages

    const language = detectLanguage(acceptedLanguages);
    const uuid = req.query.personID || req.params.personID;

    // Use context.with() to ensure the trace context is propagated
    const [greetingResponse, personResponse] = await context.with(activeContext, () =>
      Promise.all([
        fetchGreetingAsync({ language }),
        fetchPersonAsync({ uuid }),
      ])
    );

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
