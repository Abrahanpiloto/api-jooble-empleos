import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config(); 


// Configura la autenticación con las credenciales de la cuenta de servicio:
const auth = new google.auth.GoogleAuth({
  keyFile: './google-credentials.json', 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Crea el cliente de Google Sheets:
const sheets = google.sheets({ version: 'v4', auth });

// ID de la hoja de cálculo desde .env
const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

// Función para escribir o guardar datos de la hoja de calculo:
async function saveInSheets() {
  const client = await auth.getClient() //Obtiene el cliente autenticado,ya puede hacer peticiones a Google Sheets
  const sheetRange = "Hoja 1!A2:F";
  const readRange = "Hoja 1!E2:E"; // Solo lee la columna E (URLs)
  const writeRange = "Hoja 1!A2:F"; // Donde s  e escriben los nuevos empleos

  // 1. Leer empleos desde el archivo JSON:
  const rawData = fs.readFileSync("jobs.json", "utf-8");
 
  const data = JSON.parse(rawData);
 
  let jobs = data;

  // 2. Leer empleos ya guardados par evitar duplicados:
  const existingJobRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: readRange,
    auth: client,
  });
  const existingValues = await existingJobRes.data.values || [];  // 👉 Extraes los valores que ya están escritos. 
  // Si no hay nada, crea un array vacío.

  // 3. Crear un set con URLs ya guardadas en la hoja(para evitar duplicados):
  const existingUrls = new Set(existingValues.map(row => row[0]));

  // 4. Filtrar los empleos nuevos:(“De todos los trabajos que tengo, quédate solo con los que NO estén ya guardados en la hoja.”)
  const newJobs = jobs.filter(job=> !existingUrls.has(job.url));

   // 5. 🕒 Agrega una fila con la fecha y hora actual:
  const currentDate = new Date().toLocaleString();

  // 6. Preparar los datos para insertar:
  const rows = newJobs.map(job => [
    job.title,
    job.company,
    job.location,
    job.updated,
    job.link,
    currentDate
  ]);

  if(rows.length === 0) {
    console.log("No hay nuevos empleos para insertar")
    return;
  };

  // 7. Insertar en la hoja:
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: writeRange,
    valueInputOption: "RAW",
    resource: {
      values: rows,
    },
    auth: client,
  });
     console.log(`${rows.length} empleos nuevos agregados a la hoja.`);
  

}

saveInSheets().catch(console.error)