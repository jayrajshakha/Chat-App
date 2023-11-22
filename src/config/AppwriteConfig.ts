import { Client , Account} from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("655cb125a03f88a091b6");

export const account = new Account(client);

export { ID } from 'appwrite';
