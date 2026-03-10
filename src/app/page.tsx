import { prisma } from "@/libs/prisma";

export default async function HomePage() {
  const proyectos = await prisma.project.findMany({
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        <h1 className="text-3xl font-bold">TaskFlow</h1>

        {proyectos.map((proyecto) => (
          <section
            key={proyecto.id}
            className="rounded-xl border p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-3 w-3 rounded-full border"
                style={{ backgroundColor: proyecto.color }}
              />
              <h2 className="text-xl font-semibold">{proyecto.name}</h2>
            </div>

            <p className="text-sm mb-4">
              {proyecto.description ?? "Sin descripcion"}
            </p>

            <div className="space-y-2">
              {proyecto.tasks.length === 0 ? (
                <p className="text-sm">Sin tareas</p>
              ) : (
                proyecto.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border p-3"
                  >
                    <h3 className="font-medium">{task.title}</h3>

                    <p className="text-sm">
                      {task.description ?? "Sin descripcion"}
                    </p>

                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="border px-2 py-1 rounded">
                        {task.status}
                      </span>

                      <span className="border px-2 py-1 rounded">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        ))}

      </div>
    </main>
  );
}