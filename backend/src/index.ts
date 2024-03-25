import app from "./app.js"
import { connectedToDatabase } from "./db/connection.js"


const PORT = process.env.PORT || 5000
console.log(PORT)
connectedToDatabase().then(()=> {
  app.listen(PORT,() => 
    console.log("Server connected and Database connected ")
    );
})
.catch((err) => console.log(err));

