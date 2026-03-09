import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL no esta definida");
}

const adapter = new PrismaPg({
    connectionString: databaseUrl,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();

    await prisma.project.create({
        data: {
            name: "Web Corporativa",
            description: "Sitio institucional de la empresa",
            color: "#3b82f6",
            tasks: {
                create: [
                    {
                        title: "Disenar landing page",
                        description: "Crear estructura inicial",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Implementar navbar",
                        description: "Barra principal del sitio",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Optimizar SEO",
                        description: "Metadatos y estructura semantica",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Agregar formulario de contacto",
                        description: "Formulario funcional con validaciones",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Corregir estilos responsive",
                        description: "Ajustes para tablet y movil",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    await prisma.project.create({
        data: {
            name: "App Movil",
            description: "Aplicacion principal del negocio",
            color: "#10b981",
            tasks: {
                create: [
                    {
                        title: "Definir pantallas",
                        description: "Wireframes y flujo base",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Probar navegacion",
                        description: "Validar rutas y tabs",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Ajustar estilos",
                        description: "Mejoras visuales generales",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Integrar autenticacion",
                        description: "Login y registro",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Implementar perfil de usuario",
                        description: "Pantalla de perfil editable",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    await prisma.project.create({
        data: {
            name: "Panel Administrativo",
            description: "Dashboard de administracion interna",
            color: "#f59e0b",
            tasks: {
                create: [
                    {
                        title: "Crear layout del dashboard",
                        description: "Sidebar y header principal",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Mostrar estadisticas",
                        description: "Tarjetas con metricas",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Agregar tabla de usuarios",
                        description: "Listado de usuarios del sistema",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Implementar filtros",
                        description: "Filtrar por estado y rol",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Mejorar accesibilidad",
                        description: "Contrastes y navegacion por teclado",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();

    console.log("Seed completado correctamente");
    console.log({ totalProjects, totalTasks });
}

main()
    .catch((error) => {
        console.error("Error ejecutando seed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
