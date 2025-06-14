import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());

const auth = new google.auth.GoogleAuth({
  keyFile: "./google-credentials.json",  // asegúrate de tener este archivo
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

app.get('/api/jobs', async (req, res) => {
  try {
    const client = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range: "Hoja 1!A2:F", // Ajusta según tu hoja
    });

    const rows = response.data.values;
    res.json(rows || []);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "No se pudo obtener los datos" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});