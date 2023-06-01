import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input()
  cause: string = "";
  @Input()
  message: string = "";

  constructor(private router: Router) {
    let error: Error = router.getCurrentNavigation()?.extras.state as Error;
    console.log(error);
    this.message = error.message;
  }
}
