const createCustomersTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS customers (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number VARCHAR(9) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    gender CHAR(1) NOT NULL);`;

export default createCustomersTable;
