# 🩻 Radiolab Academy

Web educativa independiente para estudiantes de Técnico Superior en Imagen para el Diagnóstico y Medicina Nuclear.

## Estado actual
- Interfaz real conectada a Supabase **TPIDMN**, en `index.html`.
- 17 asignaturas en el selector, 5 lecciones introductorias originales de **muestra**, tests automáticos, registro e inicio de sesión, perfil con emoji, notas, repaso de errores, XP, ranking y foro con actualización en tiempo real.
- Estudiantes: pueden estudiar y escribir en el foro, pero **no editar contenidos**. La edición de lecciones publicadas solo se autoriza mediante una tabla de administradores y RLS.
- Pendiente: incorporar todos los temas del Drive de forma revisada y con autorización, moderación avanzada del foro, duelos en vivo y modo Kahoot simultáneo. **No se ha probado aún con usuarios reales.**

## Activar GitHub Pages sin coste
1. Abre `Settings > Pages` en este repositorio.
2. En `Build and deployment`, elige `Deploy from a branch`.
3. Selecciona `main` y carpeta `/(root)`, pulsa `Save`.
4. Copia la URL que GitHub Pages muestre al completar la publicación.

## Configurar email en Supabase
1. Abre [TPIDMN · Authentication URL Configuration](https://supabase.com/dashboard/project/xtrgmxnohdmlckspyaza/auth/url-configuration).
2. Coloca la URL pública exacta de GitHub Pages como `Site URL` y como redirección autorizada.
3. Revisa `Authentication > Providers > Email` y confirma si la verificación de correo está habilitada.
4. Registra una cuenta desde la web y verifica su correo electrónico.

## Habilitar el panel de administración para el propietario
Una vez registrada tu cuenta, abre SQL Editor en TPIDMN y ejecuta, sustituyendo **solo tu propio correo**:
```sql
insert into public.admin_users(user_id)
select id from auth.users where email = 'TU_CORREO'
on conflict do nothing;
```
Después cierra y vuelve a iniciar sesión o actualiza la página. No se concede rol de administrador automáticamente.

## Seguridad y límites
- Supabase contiene las cuentas y el progreso; en GitHub solo se sube una **clave publicable**.
- No introducir nunca claves secretas en archivos públicos.
- La clasificación XP es recreativa (las respuestas se corrigen en el navegador).
- Se usa contenido original de demostración, no se redistribuyen los PDF de ILERNA ni material ajeno sin autorización.
- GitHub Pages y Supabase Free están sujetos a cuotas y condiciones de sus proveedores.
