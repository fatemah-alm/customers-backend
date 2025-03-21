const createUsersTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL);`;

export default createUsersTable;
