import { Component, Input } from '@angular/core';
import { Ocena } from 'src/app/models/ocena.model';

@Component({
  selector: 'app-ocena-preview',
  templateUrl: './ocena-preview.component.html',
  styleUrls: ['./ocena-preview.component.scss']
})
export class OcenaPreviewComponent {
  @Input()
  ocena: Ocena = new Ocena();
  constructor() {
  }
}
