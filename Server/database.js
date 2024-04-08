const { default: mongoose } = require("mongoose");

const connection_string = "mongodb://localhost:27017/Shoe_shop";

const connection = () => {
  mongoose
    .connect(connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to database is successful"))
    .catch((error) => console.log(error));
};

module.exports = connection;
