import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MemoriesComponent } from './pages/memories/memories.component';
import { MemoryComponent } from './pages/memory/memory.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeRedirectService } from './services/home-redirect.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent, canActivate: [HomeRedirectService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'memories', component: MemoriesComponent, canActivate: [AuthGuardService] },
  { path: 'memory/:memoryID', component: MemoryComponent, canActivate: [AuthGuardService] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
