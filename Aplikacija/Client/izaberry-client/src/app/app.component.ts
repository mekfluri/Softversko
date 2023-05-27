import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'izaberry-me';

  constructor(private router: Router, private loaderService: LoadingService, private renderer: Renderer2){}

  ngAfterViewInit(): void {
    this.loaderService.progress().subscribe((status: boolean) => {
      if(status){
        this.renderer.addClass(document.body, 'cssload-speeding-wheel');
      }
      else {
        this.renderer.removeClass(document.body, 'cssload-speeding-wheel');
      }
    });
  }

  redirectToLogin() {
    this.router.navigateByUrl("login");
  }
}
