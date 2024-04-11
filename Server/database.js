const { default: mongoose } = require("mongoose");

const connection_string = "mongodb+srv://pratikdabhade66344:RPQi5bLked7qfz3y@cluster0.sjy9ilx.mongodb.net/Shoe_shop";

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
