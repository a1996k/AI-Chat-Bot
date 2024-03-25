import {connect, disconnect} from "mongoose"

async function connectedToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    }
    catch(error){
        console.log(error)
        throw new Error("Cant connect to Mongodb")
    }
}

async function disconnectFromoDatabase(){
    try{
        await disconnect();
    }
    catch(error){
        console.log(error)
        throw new Error("Cant connect to Mongodb")
    }
}

export {connectedToDatabase, disconnectFromoDatabase}