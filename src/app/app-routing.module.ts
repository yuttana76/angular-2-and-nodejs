import { PostCreateComponent } from './posts/post-create/post-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.compopnent';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { WorkFlowStepperComponent } from './workFlow/work-flow-stepper/work-flow-stepper.component';
import { WorkFlowTabComponent } from './workFlow/work-flow-tab/work-flow-tab.component';

const routes: Routes = [
{ path: '', component: PostListComponent },
{ path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
{ path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
{ path: 'login', component: LoginComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'workFlow', component: WorkFlowStepperComponent},
{ path: 'workFlowTab', component: WorkFlowTabComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
