import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://tirthabiswasm:hx5UAIgjSOcxrbus@cluster0.mbjn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsInsecure: false,
    useUnifiedTopology: true,
  };
const client = new MongoClient(uri,options);
const clientPromise = client.connect();

export default clientPromise;