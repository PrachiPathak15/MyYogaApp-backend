const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://PrachiPathak15:ABC%40123@cluster0.a4ofrtg.mongodb.net/"
const client = new MongoClient(uri);

async function main(){
    try {
        await client.connect(); 
        await joinCollections(client);
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function joinCollections(client){
    const result = await client.db("Yoga").collection("users").aggregate([
        {
            $lookup:
            {
                from: "teachers",
                localField: "batch",
                foreignField: "batch",
                as: "trainer"
            }
        }
    ]).toArray();
    return result;
}


module.exports = joinCollections(client)