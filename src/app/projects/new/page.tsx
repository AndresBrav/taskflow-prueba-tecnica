import Link from "next/link";
import { createProject } from "@/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewProjectPage = () => {
    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto max-w-3xl space-y-8">
                <section className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Nuevo Proyecto</h1>
                        <p className="text-sm text-muted-foreground">
                            Crea un nuevo proyecto para comenzar a organizar tus tareas.
                        </p>
                    </div>
                </section>

                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de proyecto</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form action={createProject} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Ej: Sistema de inventario"
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium">
                                    Descripcion
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe brevemente el proyecto"
                                    className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="color" className="text-sm font-medium">
                                    Color
                                </label>
                                <input
                                    id="color"
                                    name="color"
                                    type="color"
                                    defaultValue="#6366f1"
                                    className="h-12 w-20 rounded-md border p-1"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="submit">
                                    Guardar proyecto
                                </Button>

                                <Button variant="outline" asChild>
                                    <Link href="/projects">Cancelar</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NewProjectPage;