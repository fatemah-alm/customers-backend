const createCustomersTable = `
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number VARCHAR(9) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(1) NOT NULL);`;

export default createCustomersTable;
