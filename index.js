import dotenv from 'dotenv';
dotenv.config(); 
import fetch from 'node-fetch';
import fs from 'fs';

const url = "https://es.jooble.org/api/";
const key = process.env.JOOBLE_API_KEY;
const JOOBLE_URL = url + key;

const params = {
  keywords: "python",
  location: "madrid",
}

async function searchJobs() {
  try {
    const response = await fetch(JOOBLE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
    if(!response.ok){
       throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const empleos = data.jobs;
    console.log("RESPUESTA DE JOOBLE:", data);

    fs.writeFileSync("jobs.json", JSON.stringify(empleos, null,2));
    console.log("Empleos guardados con exito en jobs.json");
  } catch (error) {
    console.error('Error al hacer la solicitud:', error.message);
  }
}

searchJobs()