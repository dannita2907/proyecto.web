# Guía de arquitectura y presentación — Proyecto EPS React

> Documento de estudio basado en la estructura real del repositorio. Rama de trabajo: `correcciones-arquitectura`. El proyecto es un **prototipo frontend académico**, no un sistema clínico en producción.

## 1. Qué hace el proyecto
Simula el portal de una EPS: selección de nombre y sede, página de bienvenida, registro e inicio de sesión, menú de servicios, agendamiento de citas, actualización de datos, certificados, asistente DaDaIA y contenidos informativos (bienestar, afiliaciones, noticias, redes, misión y otros apartados definidos en JSON).

## 2. Tecnologías
- **HTML**: documento raíz `index.html`.
- **JavaScript (ES Modules)**: lógica, funciones y manejo de datos.
- **React 18**: componentes JSX, propiedades (props), estados (`useState`) y hooks personalizados.
- **Vite 5**: servidor de desarrollo y compilación para producción.
- **CSS**: estilos separados en `src/Style/`.
- **JSON**: catálogos de servicios, sedes, especialidades, tarjetas, certificados y respuestas.
- **localStorage**: persistencia *local y demostrativa* en un solo navegador; no sustituye una base de datos.

## 3. Arquitectura y flujo de ejecución
```text
index.html
  └─ src/main.jsx
      └─ App.jsx
          └─ Orquestador/Orquestador.jsx
              ├─ Hooks/useOrquestador.js (pantalla, EPS, sede, usuario)
              ├─ Home/Home.jsx
              ├─ Pages/ (conectan lógica y presentación)
              │   ├─ IngresoPage → useIngreso → Componentes/Ingreso
              │   ├─ FormularioPage → useFormulario → Componentes/Formulario
              │   ├─ AgendamientoPage → useAgendamiento → Componentes/Agendamiento
              │   ├─ ActualizacionDatosPage → useActualizacionDatos → Componentes/ActualizacionDatos
              │   ├─ CertificadosPage → useCertificados → Componentes/Certificados
              │   ├─ DaDaIAPage → useDaDaIA → Componentes/DaDaIA
              │   └─ InformacionPage → useInformacion → Componentes/Informacion
              └─ Pages/Servicios.jsx
data/*.json ─────────► hooks/componentes
services/storage.js ─► hooks que persisten datos
Style/*.css ─────────► componentes y pantallas
```

El orquestador decide qué pantalla se muestra usando el estado `pantalla`; **no utiliza React Router**. `Pages` son componentes contenedores que conectan hooks con componentes visuales. Los hooks gestionan estados, eventos y validaciones; los componentes muestran la interfaz.

## 4. Recorrido paso a paso
1. **Arranque**: `main.jsx` monta `App` en el elemento raíz del HTML.
2. **Ingreso EPS**: `useIngreso` comprueba nombre y sede; `useOrquestador.ingresar` guarda esos valores y abre `home`.
3. **Home**: muestra tarjetas desde `tarjetas.json`; permite ir a formulario o servicios si hay sesión.
4. **Registro**: `useFormulario` lee `camposRegistro.json`, valida campos, verifica duplicados y guarda un usuario de demostración en `localStorage`.
5. **Inicio de sesión**: busca el correo y contraseña entre usuarios guardados; pasa el usuario sin contraseña a `useOrquestador.iniciarSesion`.
6. **Servicios**: crea los botones desde `servicios.json` y llama `irA(pantalla, pestana)`.
7. **Citas**: `useAgendamiento` exige especialidad válida y fecha no anterior a hoy; guarda una cita con identificador y correo, y muestra solo las citas del usuario.
8. **Actualización de datos**: solo permite editar campos marcados como `editable` en `camposRegistro.json`; sincroniza la lista de usuarios y la sesión.
9. **Certificados**: elige una plantilla de `certificados.json` y muestra un certificado de demostración con los datos del usuario.
10. **DaDaIA**: busca palabras clave de `respuestas.json` en el mensaje y muestra una respuesta predefinida; **no es IA generativa**.
11. **Información**: las pestañas y tarjetas se construyen desde `informacion.json`.
12. **Cerrar sesión**: elimina `usuarioActivo` del almacenamiento y regresa a `home`.

## 5. Responsabilidades de las carpetas
| Carpeta | Responsabilidad |
|---|---|
| `src/Componentes/` | Interfaz reutilizable: Campo, Selector, Boton, Pantalla, Encabezado, Cita, Mensaje, formularios y módulos visuales |
| `src/Pages/` | Une cada hook con la vista correspondiente y le entrega props |
| `src/Hooks/` | Estados, validaciones, eventos y lógica por funcionalidad |
| `src/Orquestador/` | Decide qué pantalla renderizar y bloquea pantallas privadas sin sesión |
| `src/Home/` | Inicio y animaciones |
| `src/Tarjetas/` | Tarjeta de presentación |
| `src/data/` | Catálogos y textos JSON |
| `src/services/` | Funciones reutilizables para leer, guardar y borrar datos locales |
| `src/Style/` | Estilos CSS |
| `src/asset/` | Imágenes y recursos SVG |

## 6. Conceptos para explicar al profesor
- **Componente**: función que devuelve JSX y representa una parte de la interfaz.
- **Props**: valores y funciones que un componente padre entrega a un hijo.
- **Estado**: información que cambia durante el uso; `useState` actualiza la vista cuando cambia.
- **Hook personalizado**: función que comienza por `use` y encapsula estado y comportamiento reutilizable.
- **Renderizado condicional**: mostrar una pantalla según el valor de `pantalla` y la sesión.
- **Map**: transformar un arreglo JSON en componentes visuales.
- **Filter**: seleccionar citas del usuario o campos editables.
- **Find / some**: localizar respuestas o comprobar usuarios duplicados.
- **Separación de responsabilidades**: vista, coordinación, lógica y persistencia cumplen papeles distintos.
- **Persistencia**: localStorage conserva información tras recargar, solo en ese navegador y origen.

## 7. Cambios aplicados en la rama
- Pantallas privadas bloqueadas cuando no hay usuario; rutas desconocidas vuelven a Home.
- Acceso a `localStorage` centralizado en `services/storage.js`, con manejo de errores.
- Registro: correo normalizado, validaciones de documento, teléfono, correo, fecha y contraseña; duplicados por correo/documento.
- Citas: comprobación explícita de especialidad y fecha local, persistencia controlada.
- Actualización de datos: validación y sincronización de usuario.
- Campos y selectores: asociación `label`–`input` mediante identificadores.
- DaDaIA: actualización funcional del arreglo de mensajes para evitar estados desactualizados.
- Sin cambios intencionales en CSS ni en la identidad visual.

## 8. Límites y decisiones técnicas
**Importante:** el prototipo guarda usuarios y contraseñas en `localStorage` para simular un login. Eso es **inseguro** para uso real. No introducir contraseñas habituales, documentos reales ni información médica. Un sistema de EPS real requiere servidor, autenticación y autorización verificadas en backend, contraseñas con hash, base de datos, control de citas concurrentes, auditoría, privacidad y gestión segura de sesiones. Los certificados son plantillas visuales, no documentos oficialmente verificables. DaDaIA es un bot por reglas.

No hay evidencia de pruebas end-to-end completas, backend, base de datos relacional, integración con agenda médica real ni despliegue seguro. No afirmar que existen.

## 9. Cómo ejecutar y comprobar
Desde la carpeta del repositorio:
```bash
npm install
npm run build
npm run dev
```
Abrir la URL local que muestra Vite. Para probar la compilación: `npm run preview` tras `npm run build`.

**Pruebas manuales antes de exponer:**
1. Seleccionar EPS y sede; confirmar Home.
2. Crear usuario ficticio; probar errores por correo inválido, contraseñas distintas y registro duplicado.
3. Iniciar sesión con datos ficticios y comprobar Servicios.
4. Agendar cita con fecha válida; comprobar que aparece; intentar fecha vacía o pasada.
5. Cambiar nombre, teléfono y dirección; verificar persistencia.
6. Elegir certificado y comprobar datos mostrados.
7. Preguntar a DaDaIA por citas, certificados y un texto desconocido.
8. Recorrer bienestar, afiliaciones, noticias y demás pestañas.
9. Cerrar sesión; verificar que no se muestran servicios privados.
10. Recargar y comprobar el comportamiento esperado; abrir consola del navegador para detectar errores.

## 10. Guion sugerido de presentación (5–7 minutos)
**Introducción:** “Desarrollamos un prototipo frontend de servicios para una EPS con React y Vite”.
**Arquitectura:** “Separamos orquestación, páginas, componentes, hooks, datos y almacenamiento local”.
**Demostración:** selección de EPS → registro/login ficticio → servicios → cita → certificado → DaDaIA → cierre de sesión.
**Justificación:** “Esta estructura permite cambiar vistas sin reescribir lógica, reutilizar controles y sustituir después el almacenamiento local por una API”.
**Limitaciones:** “No es un sistema médico de producción; carece de backend, seguridad de autenticación y agenda real”.
**Cierre:** “Las siguientes mejoras serían API, base de datos, pruebas automatizadas y autenticación segura”.

## 11. Preguntas frecuentes
**¿Por qué React?** Para dividir la interfaz en componentes y actualizarla cuando cambia el estado.
**¿Por qué Vite?** Para desarrollo rápido y generación de una versión compilada.
**¿Qué hace el orquestador?** Mantiene el estado de navegación y elige la pantalla que debe renderizarse.
**¿Qué diferencia hay entre Page y Componente?** Page conecta lógica y vista; el componente se concentra en mostrar y recibir interacciones.
**¿Dónde está la base de datos?** No existe: se usa almacenamiento local como simulación.
**¿Qué ocurre al cerrar sesión?** Se borra el usuario activo y se vuelve a Home.
**¿Cómo responde DaDaIA?** Compara palabras clave con reglas definidas en JSON.
**¿Está lista para una EPS real?** No; se necesitaría backend y controles de seguridad y privacidad.
**¿Qué se puede mejorar?** Pruebas, persistencia en servidor, autorización, manejo central de errores y accesibilidad integral.

## 12. Archivos que conviene saber explicar
`index.html`, `src/main.jsx`, `src/App.jsx`, `src/Orquestador/Orquestador.jsx`, `src/Hooks/useOrquestador.js`, cada `src/Pages/*Page.jsx`, cada `src/Hooks/use*.js`, `src/services/storage.js`, `src/data/*.json`, `src/Componentes/*`, `src/Style/*.css`.

**Estado de verificación:** los cambios se han guardado en una rama separada; deben ejecutarse `npm run build` y las pruebas manuales en un entorno con dependencias instaladas antes de fusionar con `main`.
