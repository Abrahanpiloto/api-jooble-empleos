import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function JobTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error al cargar los empleos:", error));
  }, []);

  return (
    <Card className="mt-6 mx-4 overflow-hidden bg-[#DDE1E7]">
      <CardBody>
        <Typography variant="h5" className="mb-4 text-black">
          Empleos disponibles
        </Typography>
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="table-auto w-full text-left ">
            <thead>
              <tr className="border-b sticky top-0 bg-[#DDE1E7] z-10">
                <th className="border-b px-4 py-2 text-black">Título</th>
                <th className="border-b px-4 py-2 text-black">Empresa</th>
                <th className="border-b px-4 py-2 text-black">Ubicación</th>
                <th className="border-b px-4 py-2 text-black">Actualizado</th>
                <th className="border-b px-4 py-2 text-black">Link</th>
                <th className="border-b px-4 py-2 text-black">
                  Fecha guardado
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="border-b border-gray-500">
                  <td className="px-4 py-2 text-black">{job[0]}</td>
                  <td className="px-4 py-2 text-black">{job[1]}</td>
                  <td className="px-4 py-2 text-black">{job[2]}</td>
                  <td className="px-4 py-2 text-black">{job[3]}</td>
                  <td className="px-4 py-2 text-black">
                    <a
                      href={job[4]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      Ver
                    </a>
                  </td>
                  <td className="px-4 py-2 text-black">{job[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
