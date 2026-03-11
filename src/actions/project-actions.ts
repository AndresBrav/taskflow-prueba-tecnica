"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;

    if (!name || name.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }

    await prisma.project.create({
        data: {
            name: name.trim(),
            description: description?.trim() || null,
            color: color || "#6366f1",
        },
    });

    revalidatePath("/projects"); //volver a cargar la página de proyectos para mostrar el nuevo proyecto creado
    redirect("/projects"); //redireccionar al usuario a la página de proyectos después de crear el proyecto
}

export async function updateProject(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;

    if (!id) {
        throw new Error("El id del proyecto es obligatorio");
    }

    if (!name || name.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }

    await prisma.project.update({
        where: {
            id: id,
        },
        data: {
            name: name.trim(),
            description: description?.trim() || null,
            color: color || "#6366f1",
        },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath(`/projects/${id}/edit`);

    redirect(`/projects/${id}`);
}

export const deleteProject = async (formData: FormData) => {
    const id = formData.get("id") as string;

    if (!id) {
        throw new Error("El id del proyecto es obligatorio");
    }

    await prisma.project.delete({
        where: {
            id: id,
        },
    });

    revalidatePath("/projects");
    redirect("/projects");
};
