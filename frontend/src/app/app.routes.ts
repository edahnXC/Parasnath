import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Temples } from './temples/temples';
import { Trekking } from './trekking/trekking';
import { FloraFauna } from './flora-fauna/flora-fauna';
import { Gallery } from './gallery/gallery';
import { Contact } from './contact/contact';
import { Admin } from './admin/admin';
import { Login } from './login/login';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'temples', component: Temples },
  { path: 'trekking', component: Trekking },
  { path: 'flora-fauna', component: FloraFauna },
  { path: 'gallery', component: Gallery },
  { path: 'contact', component: Contact },
  { path: 'admin/login', component: Login },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  { path: '**', redirectTo: '' } // Catch-all wildcard redirect to home
];
