import { NgModule } from '@angular/core';
import { ProfileModule } from '../../../app/main/pages/profile/profile.module';
import { RouterModule } from '@angular/router';
const routes = [

  {
      path: 'pages',
      loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
  }

];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ProfileModule
    ]
})
export class PagesModule {

}
