import mongoose from 'mongoose';

const uri = "mongodb+srv://omaromaralkadri111:RhU8WJoPTKrDGMir@resultdb.6f1ob.mongodb.net/?retryWrites=true&w=majority&appName=resultDB";

const MONGODB_URI = uri;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedDb: mongoose.Connection | null = null;



async function dbConnect() {
    if (cachedDb) {
        return cachedDb;
    }

    const db = await mongoose.connect(MONGODB_URI!, {
        bufferCommands: false,
    });

    cachedDb = db.connection;
    return cachedDb;
}

export default dbConnect;
