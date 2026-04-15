const app = require("./index");
const connectdb = require("./config/db");

const PORT = process.env.PORT || 5454;

app.listen(PORT, async ()=> {
  await connectdb(); 
  console.log(`Server is running on port ${PORT}`);  
});  