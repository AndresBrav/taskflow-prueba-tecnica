import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopPendingProjectsProps } from "@/types/index";


export default function TopPendingProjects({
    projects,
}: TopPendingProjectsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 3 proyectos con más tareas pendientes</CardTitle>
            </CardHeader>

            <CardContent>
                {projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Aún no existen proyectos registrados.
                    </p>
                ) : (
                    <div >
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between rounded-lg border p-4 mb-4"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-muted-foreground">
                                        #{index + 1}
                                    </span>

                                    <span
                                        className="h-3 w-3 rounded-full border"
                                        style={{ backgroundColor: project.color }}
                                    />

                                    <div>
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="font-medium hover:underline"
                                        >
                                            {project.name}
                                        </Link>

                                        <p className="text-sm text-muted-foreground">
                                            {project.pendingCount} tarea(s) pendiente(s)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}