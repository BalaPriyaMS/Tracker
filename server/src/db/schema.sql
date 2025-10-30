CREATE TABLE IF NOT EXISTS users (
    userid CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) UNIQUE,
    createdat BIGINT NOT NULL,
    updatedat BIGINT NOT Null
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

