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
                        description: "Formulario con validaciones",
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
                        title: "Ajustar estilos visuales",
                        description: "Mejoras generales de interfaz",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Integrar autenticacion",
                        description: "Login y registro de usuarios",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Crear perfil de usuario",
                        description: "Pantalla editable de perfil",
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
                        title: "Tabla de usuarios",
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
                        description: "Navegacion por teclado",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    await prisma.project.create({
        data: {
            name: "Sistema Marketing",
            description: "Herramienta para gestionar campanas",
            color: "#ef4444",
            tasks: {
                create: [
                    {
                        title: "Crear pagina de campana",
                        description: "Landing para promociones",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Integrar correo",
                        description: "Conexion con servicio de email",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Panel de analitica",
                        description: "Metricas de campanas",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Segmentar audiencia",
                        description: "Agrupar usuarios por interes",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Optimizar rendimiento",
                        description: "Reducir tiempo de carga",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    await prisma.project.create({
        data: {
            name: "Servicio API",
            description: "Backend para servicios del sistema",
            color: "#6366f1",
            tasks: {
                create: [
                    {
                        title: "Crear endpoints REST",
                        description: "Rutas iniciales del API",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Agregar validaciones",
                        description: "Validar datos de entrada",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Escribir pruebas unitarias",
                        description: "Test para endpoints",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Agregar sistema de logs",
                        description: "Registrar eventos del sistema",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Mejorar manejo de errores",
                        description: "Respuestas claras del API",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    await prisma.project.create({
        data: {
            name: "Plataforma Ecommerce",
            description: "Sistema de tienda en linea",
            color: "#22c55e",
            tasks: {
                create: [
                    {
                        title: "Catalogo de productos",
                        description: "Listado de productos",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Carrito de compras",
                        description: "Agregar y eliminar productos",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Proceso de pago",
                        description: "Flujo de checkout",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Historial de ordenes",
                        description: "Registro de compras",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Mejorar busqueda",
                        description: "Filtrar productos",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    await prisma.project.create({
        data: {
            name: "Sistema Analitico",
            description: "Analisis de datos del negocio",
            color: "#8b5cf6",
            tasks: {
                create: [
                    {
                        title: "Recolectar eventos",
                        description: "Registrar acciones de usuario",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Crear graficos",
                        description: "Visualizar metricas",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                    {
                        title: "Generar reportes",
                        description: "Resumen mensual",
                        status: "COMPLETED",
                        priority: "LOW",
                    },
                    {
                        title: "Exportar datos",
                        description: "Descargar en CSV",
                        status: "PENDING",
                        priority: "HIGH",
                    },
                    {
                        title: "Optimizar consultas",
                        description: "Mejorar rendimiento DB",
                        status: "IN_PROGRESS",
                        priority: "MEDIUM",
                    },
                ],
            },
        },
    });

    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();

    console.log("Seed completado");
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