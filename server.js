const app = require('./app')
const connectDB = require('./config/db');

// Connect Database
connectDB();

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
