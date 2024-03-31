const City = require("./City");
const Hotel = require("./Hotel");



City.hasMany(Hotel);
Hotel.belongsTo(City);


