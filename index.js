const mongoose = require('mongoose');

const { createApp } = require('./app');

(async () => {
  try {
    // MongoDB
    const db = require('./config/keys').MongoURI;
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const app = createApp();
    const port = process.env.PORT || 3000;
    app.listen(
      port,
      console.log(`Server started on port http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
