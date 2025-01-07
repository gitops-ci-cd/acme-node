// Converted to TypeScript - Add meaningful types below
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import { protoLoaderOptions } from "./options.js";
import { metadataInterceptor } from "../middleware/metadataInterceptor.js";

const protoPath = "./proto/com/acme/schema/v1/greeting.proto";
const packageDefinition = protoLoader.loadSync(protoPath, protoLoaderOptions);
const proto = grpc.loadPackageDefinition(packageDefinition);
const serviceURL = process.env.GREETING_SERVICE_URL;
const { GreetingService, Language } = proto.com.acme.schema.v1;

const client = new GreetingService(
  serviceURL,
  grpc.credentials.createInsecure(),
  {
    interceptors: [metadataInterceptor],
  }
);

export const fetchGreeting = async (acceptedLanguages): any => {
  return new Promise((resolve, reject): any => {
    const languageEnum = Language.type.value.reduce((acc, item): any => {
      acc[item.name] = item.number;
      return acc;
    }, {});
    const preferredLanguage = acceptedLanguages.find((lang) => !!languageEnum[lang]);
    const language = languageEnum[preferredLanguage] || Language.UNKNOWN;

    client.Fetch({ language }, (error, response): any => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
};
