import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import { protoLoaderOptions } from "./options.js";

const protoPath = "./proto/com/acme/schema/v1/greeting.proto";
const packageDefinition = protoLoader.loadSync(protoPath, protoLoaderOptions);
const proto = grpc.loadPackageDefinition(packageDefinition);
const serviceURL = process.env.GREETING_SERVICE_URL;
const { GreetingService, Language } = proto.com.acme.schema.v1;

const client = new GreetingService(
  serviceURL,
  grpc.credentials.createInsecure(),
);

export const fetchGreeting = async (acceptedLanguages) => {
  return new Promise((resolve, reject) => {
    const languageEnum = Language.type.value.reduce((acc, item) => {
      acc[item.name] = item.number;
      return acc;
    }, {});
    const preferredLanguage = acceptedLanguages.find((lang) => !!languageEnum[lang]);
    const language = languageEnum[preferredLanguage] || Language.UNKNOWN;

    client.Fetch({ language }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
};
