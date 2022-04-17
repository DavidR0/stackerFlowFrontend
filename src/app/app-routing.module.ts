import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { UserComponent } from './pages/user/user.component';
import { ViewQuestionComponent } from './pages/view-question/view-question.component';
import { AuthGuard } from './utils/authGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'createQuestion', component: CreateQuestionComponent, canActivate: [AuthGuard]},
  { path: 'viewQuestion/:id', component: ViewQuestionComponent, canActivate: [AuthGuard]},
  { path: 'searchResults/:query', component: SearchResultsComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
