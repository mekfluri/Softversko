import { Component, OnInit } from '@angular/core';
import { CdkAccordion, CdkAccordionModule } from '@angular/cdk/accordion';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag.model';
import { getSafePropertyAccessString } from '@angular/compiler';

@Component({
  selector: 'app-tag-operations',
  templateUrl: './tag-operations.component.html',
  styleUrls: ['./tag-operations.component.scss'],
})
export class TagOperationsComponent implements OnInit{

  tagovi: Tag[] | null = null;
  currentTag: Tag = new Tag(0, "");

  constructor(private tagService: TagService) {}

  async getTags() {
    this.tagovi = await this.tagService.getAllTags();
  }

  async createTag() {
    let response = await this.tagService.createTag(this.currentTag);
  }

  async deleteTag() {
    let response = await this.tagService.deleteTag(this.currentTag);
  }

  cleanTags() {
    this.tagovi = null;
  }

  tagKeyUp(event: Event) {
    this.currentTag.naziv = (event.target as HTMLInputElement).value;
  }

  idKeyUp(event: Event){
    this.currentTag.id = parseInt((event.target as HTMLInputElement).value);
  }

  async ngOnInit(): Promise<void> {
  }

}
