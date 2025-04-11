import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { config } from "dotenv"
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +(configService.get<string>('DB_PORT') || 5432),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: ['**/*.entity.ts'],
    synchronize: true,
    migrations: ['./src/migrations/*-migration.ts'],
    migrationsRun: false,
    logging: true
})

export default AppDataSource