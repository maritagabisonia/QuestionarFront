import { Routes } from '@angular/router';

import { MainPageComponent } from './Pages/main-page/main-page.component';
import { AdminPageComponent } from './Pages/admin-page/admin-page.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { AuthGuard } from './guards/authGuard';
import { FullQuizComponent } from './Components/full-quiz/full-quiz.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
    {path: 'Questionnaire',  component: FullQuizComponent},
    {path: 'Questionnaire/:id',  component: FullQuizComponent}


];
