import { Component } from '@angular/core';

@Component({
  selector: 'app-oglasna',
  templateUrl: './oglasna.component.html',
  styleUrls: ['./oglasna.component.scss']
})
export class OglasnaComponent {
  i: number = 0;

  dragOver() {

  }

  dragEnter() {

  }

  dragLeave() {

  }

  dragStart(){}

  dragEnd(){}

  drop(e: Event) {
    e.preventDefault();
  }

  dodajNote() {

    var noteMaker = document.createElement("div");
    noteMaker.classList.add("noteMaker");
    document.body.appendChild(noteMaker);

    var content = document.createElement("div");

    noteMaker.appendChild(content);

    var inputDiv = document.createElement("div");
    inputDiv.className = "noteHolder"
    content.appendChild(inputDiv);

    var inputDivDesign = document.createElement("div");
    inputDivDesign.className = "noterounded";
    inputDivDesign.id = `${this.i++}`;
    console.log(inputDivDesign.id);
    inputDivDesign.draggable = true;
    inputDivDesign.addEventListener("dragstart", this.dragStart);
    inputDivDesign.addEventListener("dragend", this.dragEnd);
    inputDiv.appendChild(inputDivDesign);


    var textArea = document.createElement("textarea");
    textArea.className = "textArea";
    textArea.id = "textArea";
    textArea.cols = 24;
    textArea.rows = 10;
    inputDivDesign.appendChild(textArea);
  }
}
