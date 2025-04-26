# Proyecto de Next.js

Este es un proyecto de [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Bibliotecas usadas

- **tailwind-variants**: Manejo de variantes de componentes en Tailwind CSS.
- **zustand**: Manejo de estado global de forma simple y eficiente.
- **clsx**: Control dinámico y optimizado de clases CSS.
- **tailwindcss**: Framework de utilidades para estilos CSS.
- **motion**: Librería para animaciones fluidas y ligeras.
- **openai**: Cliente para interactuar con modelos de lenguaje LLM.

## Estructura del proyecto

El proyecto sigue un patrón de diseño basado en **Atomic Design**, organizando los componentes en:
- **Átomos**: Elementos básicos como botones, inputs, textos.
- **Moléculas**: Combinaciones de átomos que trabajan juntos (por ejemplo, un formulario de búsqueda).
- **Organismos**: Secciones más completas de la UI compuestas por moléculas y átomos.

El estado global se maneja usando **Zustand** y se comparte a través de hooks personalizados para mantener la aplicación reactiva y organizada.

## Comenzando

Primero, agrega tus variables de entorno:

- Renombr el archivo **.env.example** a **.env**
- Agrega tu openai_api_key a la variable **OPENAI_API_KEY**

Después instala las dependencias y levanta el servidor:

> **Tip:** Usa **PNPM**, es más rápido que NPM y evita muchos conflictos comunes.

```bash
# Instalación de PNPM (Linux/Mac):
brew install pnpm
```


```bash
# Primero ejecuta
pnpm install

# Luego ejecuta
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto en acción.

**Test:** Para ejecutar las pruebas unitarias solo corre:
```bash
pnpm test
```


## Prompt usado

Este es el prompt utilizado para obtener recomendaciones de productos desde un modelo de lenguaje (LLM):

```markdown
Eres un asistente que recomienda productos. Analiza esta solicitud: "${query}"
y selecciona los 5 productos más relevantes del siguiente JSON. Devuelve una respuesta amigable al usuario explicando por qué esos productos son recomendados, y también un array llamado "sugerencias" con los objetos completos recomendados.

JSON de productos:
${JSON.stringify(productos)}

Responde en este formato:
{
  "mensaje": "Explicación para el usuario",
  "sugerencias": [ ...productos relevantes ]
}

No regreses texto adicional al solicitado, solo la respuesta en el formato especificado.
Si no encuentras ningún producto adecuado, responde con el mismo objeto pero con "sugerencias" como un array vacío.
```

## Qué mejoraría con más tiempo

El proyecto fue desarrollado en aproximadamente 6 horas, enfocándome en cumplir los requerimientos en un tiempo reducido. Sin embargo, con más tiempo, mejoraría:

- Un diseño de **UI/UX** más pulido y amigable.
- Agregar **más validaciones** robustas a los formularios y componentes.
- Crear **variantes completas** para los componentes principales.
- Ejecutar **pruebas unitarias** más extensas y pruebas de **rendimiento**.
- Optimizar aún más el uso de **assets** (imágenes, íconos, fuentes).
- Mejorar el **prompt** para utilizar menos tokens de procesamiento y ser más eficiente.
- Modularizar mejor las consultas API y manejar los errores con mayor detalle.

---