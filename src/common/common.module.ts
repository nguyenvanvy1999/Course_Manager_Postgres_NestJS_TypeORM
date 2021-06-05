import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from './config';

@Global()
@Module({ imports: [AppConfigModule] })
export class CommonModule {}
