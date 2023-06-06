import { Component, Input, OnInit } from '@angular/core';
import { Preference } from 'src/app/models/preference.model';
import { Student } from 'src/app/models/student.model';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit{
  student: Student | null = null;
  @Input()
  tagovi: Tag[] | null = null;
  newPreferences: Preference[] | null = null;

  constructor(private userService: UserService, private tagService: TagService) {
  }
  async ngOnInit(): Promise<void> {
    this.student = await this.userService.getUserByToken(localStorage.getItem("authToken")!);
    this.tagovi = await this.tagService.getAllTags();
  }

  addPreference() {
    if(this.newPreferences == null){
      this.newPreferences = new Array<Preference>();
    }
    this.newPreferences.push(new Preference());
  }

  async saveNewPreferences() {
    await this.userService.addPreferences(this.newPreferences!);
    this.student?.preference.push(...this.newPreferences!);
    this.newPreferences = null;
  }

  async removePref(event: Event) {
    let prefId = parseInt((event.target as HTMLButtonElement).id);
    let pref = this.student?.preference.find(p => p.id == prefId);
    let idx = this.student?.preference.indexOf(pref!);
    this.student?.preference.splice(idx!, 1);
    await this.userService.removePreference(prefId);
  }
}
