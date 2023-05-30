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

  constructor(private tagService: TagService) {}

  async getTags() {
    this.tagovi = await this.tagService.getAllTags();
  }

  cleanTags() {
    this.tagovi = null;
  }

  async ngOnInit(): Promise<void> {
  }

}
