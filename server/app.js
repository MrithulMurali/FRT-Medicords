const express = require("express");


const adminRoutes = require("./routes/admin");
const loginRoutes = require("./routes/login");

const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const Patient = require("./models/patient");
const Ailments = require("./models/ailments");

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

app.use('/admin',adminRoutes)
app.use('/login',loginRoutes);

// app.use("/",(req,res,next)=>{
//     Patient.findById()
// });

const PORT = process.env.PORT || 8080;


Ailments.belongsTo(Patient, {constraints: true, onDelete: 'CASCADE'});
Patient.hasMany(Ailments);
app.listen(PORT, console.log(`Server started on port ${PORT}`));

sequelize.sync(
   //{force : true}
).then(result=>{
   // app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log(err));

