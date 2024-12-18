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
  grpc.credentials.createInsecure()
);

export const fetchGreeting = async (preferredLanguage) => {
  return new Promise((resolve, reject) => {
    const languageEnum = {};
    Language.type.value.forEach(entry => {
      languageEnum[entry.name] = entry.number;
    });
    const language = languageEnum[preferredLanguage.toUpperCase()];

    client.Fetch({ language }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
};

// const { default: grpc } = await import("@grpc/grpc-js");
// const { default: protoLoader } = await import("@grpc/proto-loader");
// let { protoLoaderOptions } = await import("./src/clients/options.js");
