import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import { protoLoaderOptions } from "./options.js";

const protoPath = "./proto/com/acme/schema/v1/person.proto";
const packageDefinition = protoLoader.loadSync(protoPath, protoLoaderOptions);
const proto = grpc.loadPackageDefinition(packageDefinition);
const serviceURL = process.env.PERSON_SERVICE_URL;
const { PersonService } = proto.com.acme.schema.v1;

const client = new PersonService(
  serviceURL,
  grpc.credentials.createInsecure()
);

export const fetchPerson = async (uuid) => {
  return new Promise((resolve, reject) => {
    client.Fetch({ uuid }, (error, response) => {
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
