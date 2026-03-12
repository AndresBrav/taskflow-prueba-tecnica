import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatPriority, formatStatus, getPriorityStyles, getStatusStyles } from "@/lib/task-utils"; // función para obtener los estilos según el estado de la tareas
import type { ProjectsTasksListProps } from "@/types/index"; //tipos del componente


const ProjectsTasksList = async ({ project }: ProjectsTasksListProps) => {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tareas del proyecto</h2>
            </div>

            {project.tasks.length === 0 ? (
                <Card>
                    <CardContent className="py-10 text-center">
                        <p className="text-lg font-semibold">No hay tareas todavía</p>
                        <p className="text-sm text-muted-foreground">
                            Agrega una nueva tarea para comenzar a trabajar en este proyecto.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {project.tasks.map((task) => (
                        <Card key={task.id} className="transition hover:shadow-md">
                            <CardContent className="space-y-5 p-5">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-lg font-semibold">{task.title}</h3>

                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyles(task.status)}`}
                                            >
                                                {formatStatus(task.status)}
                                            </span>

                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-medium ${getPriorityStyles(task.priority)}`}
                                            >
                                                Prioridad {formatPriority(task.priority)}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {task.description || "Sin descripción"}
                                        </p>

                                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                            <p>
                                                <span className="font-medium text-foreground">Creada:</span>{" "}
                                                {new Date(task.createdAt).toLocaleDateString()}
                                            </p>

                                            <p>
                                                <span className="font-medium text-foreground">Actualizada:</span>{" "}
                                                {new Date(task.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                                        <Select>
                                            <SelectTrigger className="w-full sm:w-[180px] lg:w-[180px]">
                                                <SelectValue placeholder="Cambiar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Estados</SelectLabel>
                                                    <SelectItem value="PENDING">Pendiente</SelectItem>
                                                    <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                                                    <SelectItem value="COMPLETED">Completada</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <Button variant="outline">Editar</Button>
                                        <Button variant="destructive">Eliminar</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProjectsTasksList