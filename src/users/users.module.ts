import { Module } from '@nestjs/common';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SecurityModule } from 'src/security/security.module';

@Module({
    imports: [SequelizeModule.forFeature([User]), SecurityModule],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
