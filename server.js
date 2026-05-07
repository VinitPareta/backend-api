const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");
const cors = require("cors");

dotenv.config();

// connect DB
connectDB();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
