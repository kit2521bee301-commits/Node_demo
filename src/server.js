require("dotenv").config();

const app = require("./app.js");

const connectDB =
    require("./config/db.js");

connectDB();

const PORT =
    process.env.PORT ;

app.listen(PORT, () => {

    console.log(
        `Server running on ${PORT}`
    );

});