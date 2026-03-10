import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentTask {
    id: string;
    title: string;
    description: string | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    createdAt: Date;
    project: {
        id: string;
        name: string;
        color: string;
    };
}

interface RecentTasksListProps {
    tasks: RecentTask[];
}

export default function RecentTasksList({ tasks }: RecentTasksListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Últimas 5 tareas creadas</CardTitle>
            </CardHeader>

            <CardContent>
                {tasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Aún no existen tareas registradas.
                    </p>
                ) : (
                    <div >
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex flex-col gap-3 rounded-lg border p-4 mb-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="mb-1">
                                        <h3 className="font-semibold">{task.title}</h3>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span
                                                className="h-3 w-3 rounded-full "
                                                style={{ backgroundColor: task.project.color }}
                                            />
                                            <Link
                                                href={`/projects/${task.project.id}`}
                                                className="hover:underline"
                                            >
                                                {task.project.name}
                                            </Link>
                                        </div>
                                    </div>

                                    <p className="text-xs text-muted-foreground">
                                        {format(task.createdAt, "dd/MM/yyyy")}
                                    </p>
                                </div>

                                {task.description && (
                                    <p className="text-sm text-muted-foreground">
                                        {task.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">{formatStatus(task.status)}</Badge>
                                    <Badge variant="secondary">{formatPriority(task.priority)}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function formatStatus(status: RecentTask["status"]) {
    switch (status) {
        case "PENDING":
            return "Pendiente";
        case "IN_PROGRESS":
            return "En progreso";
        case "COMPLETED":
            return "Completada";
        default:
            return status;
    }
}

function formatPriority(priority: RecentTask["priority"]) {
    switch (priority) {
        case "LOW":
            return "Baja";
        case "MEDIUM":
            return "Media";
        case "HIGH":
            return "Alta";
        default:
            return priority;
    }
}