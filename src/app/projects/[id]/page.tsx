import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
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

type ProjectDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

function getStatusStyles(status: string) {
    if (status === "PENDING") {
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }

    if (status === "IN_PROGRESS") {
        return "bg-blue-100 text-blue-700 border-blue-200";
    }

    if (status === "COMPLETED") {
        return "bg-green-100 text-green-700 border-green-200";
    }

    return "bg-gray-100 text-gray-700 border-gray-200";
}

function getPriorityStyles(priority: string) {
    if (priority === "HIGH") {
        return "bg-red-100 text-red-700 border-red-200";
    }

    if (priority === "MEDIUM") {
        return "bg-orange-100 text-orange-700 border-orange-200";
    }

    if (priority === "LOW") {
        return "bg-gray-100 text-gray-700 border-gray-200";
    }

    return "bg-gray-100 text-gray-700 border-gray-200";
}

function formatStatus(status: string) {
    if (status === "PENDING") return "Pendiente";
    if (status === "IN_PROGRESS") return "En progreso";
    if (status === "COMPLETED") return "Completada";
    return status;
}

function formatPriority(priority: string) {
    if (priority === "HIGH") return "Alta";
    if (priority === "MEDIUM") return "Media";
    if (priority === "LOW") return "Baja";
    return priority;
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
        include: {
            tasks: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="h-5 w-5 rounded-full border"
                                style={{ backgroundColor: project.color }}
                            />

                            <h1 className="text-3xl font-bold">{project.name}</h1>
                        </div>

                        <p className="max-w-3xl text-sm text-muted-foreground">
                            {project.description || "Este proyecto no tiene descripción."}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <p>
                                <span className="font-medium text-foreground">Fecha de creación:</span>{" "}
                                {new Date(project.createdAt).toLocaleDateString()}
                            </p>

                            <p>
                                <span className="font-medium text-foreground">Color:</span>{" "}
                                {project.color}
                            </p>

                            <p>
                                <span className="font-medium text-foreground">Total tareas:</span>{" "}
                                {project.tasks.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/projects">Volver</Link>
                        </Button>

                        <Button variant="outline">Editar proyecto</Button>
                        <Button variant="destructive">Eliminar proyecto</Button>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <CardHeader>
                            <CardTitle>Nueva tarea</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Título</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Diseñar dashboard principal"
                                        className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Prioridad</label>

                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona prioridad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Prioridad</SelectLabel>
                                                <SelectItem value="HIGH">Alta</SelectItem>
                                                <SelectItem value="MEDIUM">Media</SelectItem>
                                                <SelectItem value="LOW">Baja</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Descripción</label>
                                <textarea
                                    placeholder="Describe brevemente la tarea"
                                    className="min-h-[110px] w-full rounded-md border px-3 py-2 text-sm outline-none"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button>Agregar tarea</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Filtros</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Estado</label>

                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Todos los estados" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Estados</SelectLabel>
                                            <SelectItem value="ALL">Todos</SelectItem>
                                            <SelectItem value="PENDING">Pendiente</SelectItem>
                                            <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                                            <SelectItem value="COMPLETED">Completada</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Prioridad</label>

                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Todas las prioridades" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Prioridades</SelectLabel>
                                            <SelectItem value="ALL">Todas</SelectItem>
                                            <SelectItem value="HIGH">Alta</SelectItem>
                                            <SelectItem value="MEDIUM">Media</SelectItem>
                                            <SelectItem value="LOW">Baja</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button className="w-full" variant="outline">
                                    Limpiar
                                </Button>

                                <Button className="w-full">Aplicar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

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
            </div>
        </div>
    );
};

export default ProjectDetailPage;