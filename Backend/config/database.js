const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`database is connected with ${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoose;
