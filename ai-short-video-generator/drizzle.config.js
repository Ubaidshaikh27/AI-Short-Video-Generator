import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_UmFq7tzY0sCL@ep-dry-queen-a96f1s5h-pooler.gwc.azure.neon.tech/ai-video-generator?sslmode=require",
  },
});
