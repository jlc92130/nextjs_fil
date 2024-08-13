const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (env) => {
  if (env == PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://delange06:5B2DENlKm13dX2eB@cluster0.uevq7ea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "DB_filactu",
        NEXTAUTH_SECRET: "codesecret",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://delange06:5B2DENlKm13dX2eB@cluster0.uevq7ea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "DB_filactu",
        NEXTAUTH_SECRET: "codesecret",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  }
};
