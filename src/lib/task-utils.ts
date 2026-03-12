export function getStatusStyles(status: string) {
    //estilos para el estado de las tareas
    if (status === "PENDING") {
        return "bg-yellow-100";
    }

    if (status === "IN_PROGRESS") {
        return "bg-blue-100 ";
    }

    if (status === "COMPLETED") {
        return "bg-green-100";
    }

    return "bg-gray-100";
}
// función para obtener los estilos según la prioridad de las tareas
export function getPriorityStyles(priority: string) {
    if (priority === "HIGH") {
        return "bg-red-100";
    }

    if (priority === "MEDIUM") {
        return "bg-orange-100";
    }

    if (priority === "LOW") {
        return "bg-gray-100";
    }

    return "bg-gray-100";
}

//funcion para obtener el estado de las tareas
export function formatStatus(status: string) {
    if (status === "PENDING") return "Pendiente";
    if (status === "IN_PROGRESS") return "En progreso";
    if (status === "COMPLETED") return "Completada";
    return status;
}

//funcion para obtener la prioridad de las tareas
export function formatPriority(priority: string) {
    if (priority === "HIGH") return "Alta";
    if (priority === "MEDIUM") return "Media";
    if (priority === "LOW") return "Baja";
    return priority;
}