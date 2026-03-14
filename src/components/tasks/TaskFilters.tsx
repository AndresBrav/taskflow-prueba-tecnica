'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // We retrieve the current values from the URL for the Select elements
  const currentStatus = searchParams.get('status') || 'ALL';
  const currentPriority = searchParams.get('priority') || 'ALL';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'ALL') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Update the URL without reloading the entire page
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros de las tareas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* State Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Estado</label>
          <Select
            onValueChange={(v) => updateFilter('status', v)}
            value={currentStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="PENDING">Pendiente</SelectItem>
              <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
              <SelectItem value="COMPLETED">Completada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Prioridad</label>
          <Select
            onValueChange={(v) => updateFilter('priority', v)}
            value={currentPriority}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas las prioridades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas</SelectItem>
              <SelectItem value="HIGH">Alta</SelectItem>
              <SelectItem value="MEDIUM">Media</SelectItem>
              <SelectItem value="LOW">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* delete to clean */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('?', { scroll: false })}
        >
          Limpiar filtros
        </Button>
      </CardContent>
    </Card>
  );
}
