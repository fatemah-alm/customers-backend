import db from "../../db/index.js";

// here is for sql
export const createCustomer = async ({ name, number, dob, gender }) => {
  const query = `
  INSERT INTO 
    customers (name, number, dob, gender)
  VALUES 
    ($1,$2,$3,$4)
    RETURNING *;`;
  try {
    const result = await db.query(query, [name, number, dob, gender]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findCustomer = async (id) => {
  const query = `
  SELECT * FROM 
  customers 
  WHERE 
  id = $1;`;
  try {
    const result = await db.query(query, [+id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findCustomerByNumber = async (number) => {
  const query = `
  SELECT * FROM 
  customers 
  WHERE 
  number = $1;`;
  try {
    const result = await db.query(query, [+number]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findAllCustomers = async (
  searchTerm = "",
  gender = "",
  number = ""
) => {
  let query = `
  SELECT * FROM
  customers WHERE 1=1`;

  const values = [];

  if (searchTerm) {
    query += ` AND LOWER(name) LIKE LOWER($${values.length + 1})`;
    values.push(`%${searchTerm}%`);
  }

  if (gender) {
    query += ` AND gender = $${values.length + 1}`;
    values.push(gender);
  }
  if (number) {
    console.log(number);

    query += ` AND number LIKE $${values.length + 1}`;
    values.push(`%${parseInt(number)}%`);
  }

  try {
    const result =
      values.length > 0 ? await db.query(query, values) : await db.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (id, { name, number, dob, gender }) => {
  const query = `
  UPDATE 
    customers
  SET 
    name = $2,
    number = $3,
    dob = $4,
    gender = $5
  WHERE
    id = $1
  RETURNING *;
  `;

  try {
    const result = await db.query(query, [id, name, number, dob, gender]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  const query = `
  DELETE FROM
    customers
  WHERE 
    id = $1
  RETURNING *;`;
  try {
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
