import db from "../index.js";
import createCustomersTable from "./1_create-customers-table.js";
import createUsersTable from "./1_create-users-table.js";
const runDbMigrations = async () => {
  console.log("BEGIN DB MIGRATION");

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    await client.query(createCustomersTable);
    await client.query(createUsersTable);
    await client.query("COMMIT");

    console.log("END DB MIGRATION");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export default runDbMigrations;
