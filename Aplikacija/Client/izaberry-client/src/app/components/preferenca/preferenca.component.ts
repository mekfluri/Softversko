import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ocena } from 'src/app/models/ocena.model';
import { Preference } from 'src/app/models/preference.model';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-preferenca',
  templateUrl: './preferenca.component.html',
  styleUrls: ['./preferenca.component.scss']
})
export class PreferencaComponent {

  ocene = new Array<number>(5).fill(0).map((val, idx) => idx + 1);
  ocenaSelected: number = 0;
  @Input()
  preferenca: Preference;

  @Input()
  tagovi: Tag[] | null = null;

  @Output()
  selectedOcena: EventEmitter<Ocena> = new EventEmitter<Ocena>();

  constructor() {
    this.preferenca = new Preference();
  }

  onSelectedOcena(event: Event) {
    this.ocenaSelected = parseInt((event.target as HTMLSpanElement).innerHTML);
    this.preferenca.ocena = this.ocenaSelected;
  }

  tagChange(event: Event) {
    let target = (event.target as HTMLSelectElement);
    let selectedOption = target.options[target.selectedIndex];
    this.preferenca.tag.naziv = selectedOption.value;
    this.preferenca.tag.id = parseInt(selectedOption.id);
  }
}
