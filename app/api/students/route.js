import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";

export async function GET() {
  await connectDB();

  const students = await Student.find();

  return Response.json(students);
}

export async function POST(request) {
  await connectDB();

  const body = await request.json();

  const student = await Student.create({
    nom: body.nom,
    classe: body.classe,
  });

  return Response.json(student);
}

export async function PUT(request) {
  await connectDB();

  const body = await request.json();

  const student = await Student.findByIdAndUpdate(
    body.id,
    {
      nom: body.nom,
      classe: body.classe,
    },
    { new: true }
  );

  return Response.json(student);
}

export async function DELETE(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  await Student.findByIdAndDelete(id);

  return Response.json({
    message: "Supprimé",
  });
}