const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const enforce = require('express-sslify');
const seed = require('../script/seed');

// redirecting HTTP to HTTPS
app.use(enforce.HTTPS({ trustProtoHeader: true }));

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
