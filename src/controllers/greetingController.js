import { fetchGreeting } from "../clients/greetingClient.js";
import { fetchPerson } from "../clients/personClient.js";

export const greet = async (req, res, next) => {
  try {
    const language = req.headers["accept-language"]?.split(",")[0];
    const id = req.params.id;

    const [greetingResponse, personResponse] = await Promise.all([
      fetchGreeting(language),
      fetchPerson(id),
    ]);

    res.status(200).json(`${greetingResponse.greeting}, ${personResponse.name}`);
  } catch (error) {
    next(error);
  }
};
