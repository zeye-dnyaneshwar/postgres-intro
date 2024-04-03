module.exports = {
    NODE_ENV: process.env.NODE_ENV || "LOCAL",
    PORT: process.env.PORT || 8050,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    JWT_EXPIRY: "3d",
    PASSWORD_HASH_SALT: 10,
    RIGHTS: { // All keys should match with TH_Rights master table codes. Any changes to be updated in scripts also. Can be 4 to 6 characters long
      CREATE_JOB: "CRJB",
      VIEW_JOB: "VWJB",
      MODIFY_JOB: "MDJB",
      DELETE_JOB: "DLJB",
      CREATE_CLIENT: "CRCL",
      VIEW_CLIENT: "VWCL",
      MODIFY_CLIENT: "MDCL",
      DELETE_CLIENT: "DLCL",
      CREATE_END_NODE: "CREN",
      VIEW_END_NODE: "VWEN",
      MODIFY_END_NODE: "MDEN",
      DELETE_END_NODE: "DLEN",
    },
  };
  