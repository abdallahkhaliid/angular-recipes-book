import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing-module';
import { Auth } from '../auth';
import { Spinner } from '../../shared/spinner/spinner';

@NgModule({
  declarations: [Auth],
  imports: [FormsModule, Spinner, AuthRoutingModule],
})
export class AuthModule {}
