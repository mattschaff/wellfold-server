import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_TYPE,
  ENV_NAME__DB_URL_NAME,
  ENV_NAME__IS_DEV,
} from './constants/global.constants';
import { Member, Reward, Transaction } from './entities';
import { DatabaseService } from './providers/database.service';
import { PrefixNamingStrategy } from './providers/prefix-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev = config.get(ENV_NAME__IS_DEV) ? true : false;
        const prefix = isDev ? `dev__` : ``;
        return {
          type: DB_TYPE,
          url: config.get(ENV_NAME__DB_URL_NAME),
          ssl: { rejectUnauthorized: false },
          autoLoadEntities: true,
          synchronize: true,
          extra: { max: 10 },
          namingStrategy: new PrefixNamingStrategy(prefix),
        };
      },
    }),
    TypeOrmModule.forFeature([Member, Reward, Transaction]),
  ],
  providers: [DatabaseService],
})
export class CommonModule {}
