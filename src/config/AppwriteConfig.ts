import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("655cb125a03f88a091b6");

export const account = new Account(client);
export const DATABASE = new Databases(client);

export { ID } from "appwrite";

export const DATABASE_ID = "65604485741a37eec836";

export const COLLECTION_ID = "656044c5b57f63ff5b71";
export const CHAT_ID = "6561f98bc14c65ae864e"
