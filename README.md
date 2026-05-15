# selenium_auto
Pruebas en Selenium
# 1. Levantar todo
docker compose up --build

# 2. Ver el navegador en vivo (opcional)
# Abre en tu navegador: http://localhost:7900
# Contraseña: secret

Ver el navegador en tiempo real
El contenedor selenium/standalone-chrome incluye un VNC viewer en el puerto 7900. Solo abre:
http://localhost:7900  →  contraseña: secret

[selenium-app] ──HTTP──▶ [chrome:4444]
     Node.js                Chrome remoto
     login.js               Selenium Grid