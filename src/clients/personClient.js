import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { promisify } from "util";

import { protoLoaderOptions } from "./options.js";
import { metadataInterceptor } from "../middleware/metadataInterceptor.js";

const protoPath = "./proto/com/acme/schema/v1/person.proto";
const packageDefinition = protoLoader.loadSync(protoPath, protoLoaderOptions);
const proto = grpc.loadPackageDefinition(packageDefinition);
const serviceURL = process.env.PERSON_SERVICE_URL;
const { PersonService } = proto.com.acme.schema.v1;

const client = new PersonService(
  serviceURL,
  grpc.credentials.createInsecure(),
  {
    interceptors: [metadataInterceptor],
  }
);

export const fetchPersonAsync = promisify(client.Fetch).bind(client);
