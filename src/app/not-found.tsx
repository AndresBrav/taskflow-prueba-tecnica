// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="flex justify-center">
      <Card size="sm" className="space-y-8 mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>404 Pagina no encontrada</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 ">
            Lo sentimos, no se encontro la direccion que buscas.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/" className=" ">
              Volver al Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
