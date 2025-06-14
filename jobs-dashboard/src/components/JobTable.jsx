import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function JobTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error al cargar los empleos:", error));
  }, []);

  return (
    <Card className="mt-6 mx-4 overflow-auto">
      <CardBody>
        <Typography variant="h5" className="mb-4">
          Empleos disponibles
        </Typography>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Empresa</th>
              <th className="px-4 py-2">Ubicación</th>
              <th className="px-4 py-2">Actualizado</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Fecha guardado</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{job[0]}</td>
                <td className="border px-4 py-2">{job[1]}</td>
                <td className="border px-4 py-2">{job[2]}</td>
                <td className="border px-4 py-2">{job[3]}</td>
                <td className="border px-4 py-2">
                  <a
                    href={job[4]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Ver empleo
                  </a>
                </td>
                <td className="border px-4 py-2">{job[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
