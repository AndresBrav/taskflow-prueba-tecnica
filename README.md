## Getting Started

## Nombre del proyecto y breve descripción.

    El nombre del proyecto es TaskFlow

    TaskFlow es una aplicación web que una startup necesita para gestionar proyectos y tareas.
    El sistema permitirá crear proyectos, agregar tareas dentro de cada proyecto y hacer seguimiento del estado de las tareas.
    No se requiere autenticación de usuarios, ya que la aplicación está pensada para uso individual.

## Tecnologías utilizadas (con versiones).

    se uso
    - Windows 11 Home 26200.7922
    - Visual Studio Code 1.111.0
    - DBngin 1.4.0
    - PostgreSQL 17.0
    - Navegador Brave 1.88.132 (Build oficial) (64 bits)
    - Node 20.19.4
    - npm 10.8.2

## Decisiones técnicas / Librerías utilizadas: sección donde justifiques cada librería adicional que hayas usado (por qué la elegiste, qué problema resuelve). Esto se evalúa positivamente.

    - Se ha usado el gestor de dependencias npm porque es el gestor predeterminado de Node js lo cual nos garantiza una compatibilidad nativa con Next js 16

    - Se ha usado shadcn/ui la version 4.0.2 como librería de componentes para la interfaz de usuario.
    La principal razón para elegir esta librería es que acelera el desarrollo de la interfaz y junto con Tailwind css te permite construir interfaces visualmente consistentes

## Requisitos previos (Node.js, PostgreSQL, etc.).

    - contar con Visual Studio Code 1.111.0 o otro editor de codigo moderno
    - contar con la version minima de Node js 20.9
    - contar con Postgres 17.0 o DBngin para administrar base de datos en nuestro caso PostgreSQL 17.0
    - contar con un navegador Brave 1.88.132 o Google Chrome 145.0.7632.162

## Instrucciones de instalación paso a paso:

Paso 1: crear una proyecto en postgres con el nombre "taskflow" si lo haces por defecto el usuario es "postgres" y para fines de desarrollo local la contraseña es vacia "" en la parte de configurar variables de entorno veremos como tiene que quedar el .env

## Clonar repositorio.

Paso 2: ejecutar el comando en el terminal:

- git clone https://github.com/AndresBrav/taskflow-prueba-tecnica.git
  esto descargara el proyecto en el directorio y creara la carpeta
  "taskflow-prueba-tecnica"
  Paso 3:  
   tenemos que abrir la carpeta "taskflow-prueba-tecnica" en un editor como Visual Studio Code

## Instalar dependencias.

Paso 4:
una ves dentro de la carpeta "taskflow-prueba-tecnica" en el terminal le damos a:

- npm install
  este comando instalara toda las librerias que se uso en el proyecto

## Configurar variables de entorno.

Paso 5:
tenemos que crear un archivo .env en la raiz del proyecto es en aqui que estara nuestra conexion a la base de datos
Dentro del archivo .env el formato es el siguiente:
DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
en nuestro caso: - user: postgress - pass: - db: taskflow

    y nos quedaria lo siguiente

    - DATABASE_URL="postgresql://postgres@localhost:5432/taskflow?schema=public"

    copia o escribe el resultado en .env

## Ejecutar migraciones de Prisma.

Paso 6:
ahora vamos a subir las tablas de nuestras migraciones a nuestra base de datos

- npx prisma migrate dev

  Paso 7:
  ahora instalaremos el cliente de prisma con el comando:
  - npx prisma generate
    este comando creara la capeta "generated" en la raiz del proyecto

## Ejecutar seed (datos de ejemplo).

Paso 8:
tenemos un seed para subir datos a la base de datos se encuentra en la carpeta
/prisma/seed.ts puedes ver los datos de prueba, tenemos que ejecutar el comando:

- npx prisma db seed
  esto subira los datos del seed a la base de datos local

## Levantar el servidor de desarrollo.

Paso 9:
ahora es hora de ver el proyecto corriendo para eso la base de datos local tiene que estar prendida y en el proyecto le damos a: - npm run dev

    nos aparecera informacion en el terminal como:

    > task-flow@0.1.0 dev
    > next dev

    ▲ Next.js 16.1.6 (Turbopack)
    - Local:         http://localhost:3000
    - Network:       http://192.168.56.1:3000
    - Environments: .env

    abrimos el http://localhost:3000 en el navegador y veremos el proyecto

## Variables de entorno necesarias (con ejemplo).

    En el proyecto solo se uso la conexion a la base de datos como ejemplo se tiene:

    DATABASE_URL="postgresql://postgres@localhost:5432/taskflow?schema=public"

## Capturas de pantalla de la aplicación (mínimo 3).

![alt text](dashboard.png)
