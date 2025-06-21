import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://pilynkasara:hGbZ4YP8tc7B3dhk@hrboxafrica.8cjhy.mongodb.net/blogDatabase?retryWrites=true&w=majority&appName=hrboxafrica";
const options = {};
let client;
let clientPromise;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
const clientPromise$1 = clientPromise;

export { clientPromise$1 as c };
