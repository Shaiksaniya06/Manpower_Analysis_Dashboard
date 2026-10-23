const express = require("express");
const { poolPromise } = require("./db");

const app = express();

app.get("/api/dashboard/summary", async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
      SELECT
        COUNT(*) AS totalRecords,
        COUNT(DISTINCT EmployeeKey) AS employeeCount,
        SUM(ManpowerCount) AS manpowerCount
      FROM StarSchema.FactManpower
    `);

        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to retrieve dashboard data"
        });
    }
});

// Keep your existing app.listen() if you already have one.
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server running");
});