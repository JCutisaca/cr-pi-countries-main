const server = require("./src/server");
const { conn } = require('./src/db.js');
const postDataToDB = require('./src/utils/postDataToDB')
const PORT = 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  postDataToDB();
  console.log(postDataToDB);
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
