import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle({ client: sql });

// export const db = drizzle(sql, {
//   disableWarningInBrowser: true, // 🚨 Suppress browser SQL warning
// });
