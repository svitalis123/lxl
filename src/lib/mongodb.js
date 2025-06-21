import { MongoClient } from 'mongodb';

const uri = import.meta.env?.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (import.meta.env?.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;