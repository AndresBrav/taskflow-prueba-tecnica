import { getProjects, countTasks } from "@/lib/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AllProjects = async () => {

    const projects = await getProjects();

    return (
        <div className="min-h-screen p-6">

            <div className="mx-auto max-w-7xl space-y-8">

                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">

                    <h1 className="text-3xl font-bold">
                        Lista de Proyectos
                    </h1>

                    <Button asChild>
                        <Link href="/projects/new">
                            Nuevo Proyecto
                        </Link>
                    </Button>

                </section>


                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">

                    {projects.map((project) => {

                        const taskCount = countTasks(project.tasks);

                        return (

                            <Link key={project.id} href={`/projects/${project.id}`}>

                                <Card className="hover:shadow-lg transition cursor-pointer">

                                    <CardHeader>

                                        <div className="flex justify-between items-center">

                                            <CardTitle className="text-lg">
                                                {project.name}
                                            </CardTitle>

                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: project.color }}
                                            />

                                        </div>

                                    </CardHeader>

                                    <CardContent>

                                        <p className="text-sm text-muted-foreground mb-4">
                                            {project.description || "Sin descripción"}
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 text-center">

                                            <div className="border rounded p-2">
                                                <p className="text-xs">Pendientes</p>
                                                <p className="font-bold">{taskCount.pending}</p>
                                            </div>

                                            <div className="border rounded p-2">
                                                <p className="text-xs">Progreso</p>
                                                <p className="font-bold">{taskCount.progress}</p>
                                            </div>

                                            <div className="border rounded p-2">
                                                <p className="text-xs">Completadas</p>
                                                <p className="font-bold">{taskCount.completed}</p>
                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            </Link>

                        );

                    })}

                </section>

            </div>

        </div>
    );
};

export default AllProjects;