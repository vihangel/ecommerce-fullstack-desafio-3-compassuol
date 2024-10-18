"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const bodyParser = require("body-parser");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const PORT = process.env.PORT;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'));
    await app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map