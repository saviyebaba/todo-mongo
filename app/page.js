"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [nom, setNom] = useState("");
  const [classe, setClasse] = useState("");
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

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
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom,
          classe,
        }),
      });

      setNom("");
      setClasse("");

      loadStudents();
    } catch (error) {
      console.log(error);
    }
  }

 function editStudent(student) {
  setNom(student.nom);
  setClasse(student.classe);
  setEditId(student._id);
}
async function addStudent() {
  if (!nom || !classe) return;

  if (editId) {
    await fetch("/api/students", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editId,
        nom,
        classe,
      }),
    });

    setEditId(null);
  } else {
    await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        classe,
      }),
    });
  }

  setNom("");
  setClasse("");

  loadStudents();
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
    <div className="container">
      <h1 className="title">
        Gestion des Étudiants
      </h1>

      <div className="form">
        <input
          className="input"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          className="input"
          placeholder="Classe"
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={addStudent}
        >
          Ajouter
        </button>
      </div>

      {students.map((student) => (
        <div
          key={student._id}
          className="student-card"
        >
          <span>
            {student.nom} - {student.classe}
          </span>

          <div className="actions">
          <button
  className="edit-btn"
  onClick={() => editStudent(student)}
>
  Modifier
</button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteStudent(student._id)
              }
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}