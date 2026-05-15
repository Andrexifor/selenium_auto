const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs"); // 👈 arriba del todo

async function loginAutomatico() {
  const URL      = "https://the-internet.herokuapp.com/login";
  const USUARIO  = "tomsmith";
  const PASSWORD = "SuperSecretPassword!";
  const SELENIUM_URL = process.env.SELENIUM_URL || "http://localhost:4444";

  const options = new chrome.Options();
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .usingServer(SELENIUM_URL)
    .build();

  try {
    console.log("🌐 Conectando al navegador remoto...");
    await driver.get(URL);

    await driver.wait(until.titleContains("Internet"), 5000);
    console.log("✅ Página cargada:", await driver.getTitle());

    const campoUsuario = await driver.findElement(By.id("username"));
    await campoUsuario.clear();
    await campoUsuario.sendKeys(USUARIO);
    console.log("📝 Usuario ingresado");

    const campoPassword = await driver.findElement(By.id("password"));
    await campoPassword.clear();
    await campoPassword.sendKeys(PASSWORD);
    console.log("🔑 Contraseña ingresada");

    const botonLogin = await driver.findElement(By.css("button[type='submit']"));
    await botonLogin.click();
    console.log("🖱️  Clic en Login...");

    const mensaje = await driver.wait(
      until.elementLocated(By.css(".flash.success")),
      5000
    );

    const textoMensaje = await mensaje.getText();
    console.log("🎉 Login exitoso:", textoMensaje.split("\n")[0]);

    // Screenshot corregido
    const screenshot = await driver.takeScreenshot();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const carpeta = "/app/resultados";
    const archivo = `${carpeta}/login_${timestamp}.png`;

    if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta, { recursive: true });
    fs.writeFileSync(archivo, screenshot, "base64");
    console.log(`📸 Screenshot guardado: login_${timestamp}.png`);

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await driver.quit();
    console.log("🔒 Navegador cerrado");
  }
}

loginAutomatico();