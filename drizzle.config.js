/** @type {import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://account:dsI2QnJ7ogTq@ep-gentle-thunder-a594lwax.us-east-2.aws.neon.tech/ai-interview-prep?sslmode=require',
    }
};
