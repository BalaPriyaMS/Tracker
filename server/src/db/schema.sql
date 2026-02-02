CREATE TABLE IF NOT EXISTS users (
    userid CHAR(36) PRIMARY KEY,
    username VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) UNIQUE,
    createdat BIGINT NOT NULL,
    updatedat BIGINT NOT Null
);

CREATE TABLE IF NOT EXISTS userpasswordresets (
    id VARCHAR(36) PRIMARY KEY,
    userid VARCHAR(36) NOT NULL,
    token TEXT NOT NULL,
    expiresat BIGINT NOT NULL,
    isused BOOLEAN DEFAULT FALSE,
    createdat BIGINT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS roles (
    roleid VARCHAR(36) PRIMARY KEY,
    rolename VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS userroles (
    userid VARCHAR(36) NOT NULL,
    roleid VARCHAR(36) NOT NULL,
    PRIMARY KEY (userid, roleid),
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE,
    FOREIGN KEY (roleid) REFERENCES roles(roleid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invitelinks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(300) NOT NULL UNIQUE,
    linktoken TEXT NOT NULL,
    invitedby VARCHAR(36) NOT NULL,
    isUsed BOOLEAN NOT NULL DEFAULT FALSE,
    createdat BIGINT NOT NULL,
    FOREIGN KEY (invitedby) REFERENCES users(userid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `groups` (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    createdby TEXT NOT NULL,
    updatedby TEXT NOT NULL,
    createdat BIGINT NOT NULL,
    updatedat BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS groupmembers (
    id VARCHAR(36) PRIMARY KEY,
    groupid TEXT NOT NULL,
    userid TEXT NOT NULL,
    roleid TEXT NOT NULL,
    addedby TEXT NOT NULL,
    updatedby TEXT NOT NULL,
    createdat BIGINT NOT NULL,
    updatedat BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id VARCHAR(36) PRIMARY KEY,
  groupid TEXT NOT NULL,
  category TEXT NOT NULL,
  paidby TEXT NOT NULL,
  description TEXT,
  totalamount NUMERIC NOT NULL,
  bills JSONB,
  createdby TEXT NOT NULL,
  updatedby TEXT NOT NULL,
  createdat BIGINT NOT NULL,
  updatedat BIGINT NOT NULL
);


