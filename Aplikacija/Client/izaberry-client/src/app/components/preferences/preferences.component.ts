import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preference } from 'src/app/models/preference.model';
import { Student } from 'src/app/models/student.model';
import { Tag } from 'src/app/models/tag.model';
import { AuthService } from 'src/app/services/auth.service';
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
  userId: number;
  localId: number;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private userService: UserService, private tagService: TagService) {
    this.localId = this.authService.currentUserId();
    let userId = this.route.snapshot.paramMap.get("userId");
    if(userId) {
      this.userId = parseInt(userId);
    }
    else {
      this.userId = 0;
      let err = new Error();
      err.message = "Cannot find user prefs";
      this.router.navigate(["error"], {
        state: err
      });
    }
  }

  async ngOnInit(): Promise<void> {
    this.student = await this.userService.getUserById(this.userId);
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
