import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
    stats: {
        totalProjects: number;
        totalTasks: number;
        pendingTasks: number;
        inProgressTasks: number;
        completedTasks: number;
    };
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            title: "Proyectos",
            value: stats.totalProjects,
        },
        {
            title: "Tareas",
            value: stats.totalTasks,
        },
        {
            title: "Pendientes",
            value: stats.pendingTasks,
        },
        {
            title: "En progreso",
            value: stats.inProgressTasks,
        },
        {
            title: "Completadas",
            value: stats.completedTasks,
        },
    ];

    return (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5"> {/* xl: grid 5 columnas en panatallas grandes */}
            {cards.map((card) => (
                <Card key={card.title}>
                    <CardHeader className="pb-1">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {card.title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-2xl font-bold">{card.value}</p>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}