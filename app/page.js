
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [nom, setNom] = useState("");
  const [classe, setClasse] = useState("");
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addStudent() {
    if (!nom || !classe) {
      alert("Remplissez les champs");
      return;
    }

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom,
          classe,
        }),
      });

      if (res.ok) {
        setNom("");
        setClasse("");
        loadStudents();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStudent(id) {
    try {
      await fetch(`/api/students?id=${id}`, {
        method: "DELETE",
      });

      loadStudents();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestion des Étudiants</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          type="text"
          placeholder="Classe"
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button
          onClick={addStudent}
          style={{ marginLeft: "10px" }}
        >
          Ajouter
        </button>
      </div>

      <hr />

      {students.map((student) => (
        <div
          key={student._id}
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <span>
            {student.nom} - {student.classe}
          </span>

          <button
            onClick={() => deleteStudent(student._id)}
          >
            Supprimer
          </button>
          <button
  onClick={() => updateStudent(student._id)}
>
  Modifier
</button>


        </div>
      ))}
    </div>
  );
}
async function updateStudent(id) {

  const nouveauNom = prompt("Nouveau nom");

  const nouvelleClasse = prompt("Nouvelle classe");

  if (!nouveauNom || !nouvelleClasse) return;

  await fetch("/api/students", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      nom: nouveauNom,
      classe: nouvelleClasse,
    }),
  });

  loadStudents();
}