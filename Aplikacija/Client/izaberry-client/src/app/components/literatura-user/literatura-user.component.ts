import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetiService } from 'src/app/services/predmeti.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-literatura-user',
  templateUrl: './literatura-user.component.html',
  styleUrls: ['./literatura-user.component.scss']
})
export class LiteraturaUserComponent implements OnInit {
  predmetId: number = 0;
  literatura: any[] = [];
  dokumentDivs: any[] = [];
  slikeDivs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private predmetiService: PredmetiService,
    private userService:UserService,
    private AuthService:AuthService
  ) { }

  ngOnInit(): void {
    const secondParam = this.route.snapshot.paramMap.get('userId');
  const userId = secondParam ? parseInt(secondParam, 10) : null;

  this.fetchUserData(userId);
     
  }

  fetchUserData(userId:number | null): void {
    console.log("uso sam");
    console.log(userId);
    if (userId) {
      this.userService
        .vratiLiteraturuStudenta(userId)
        .then((literatura) => {
          console.log(literatura);
          this.literatura = literatura || []; 
          console.log(literatura);
          this.createDivs();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  

  createDivs(): void {
    for (let item of this.literatura) {
      if (item.filePath.endsWith('.pdf')) {
        this.createDokumentDiv(item);
        console.log(item);
      } else if (item.filePath.endsWith('.jpg') || item.filePath.endsWith('.png')) {
        this.createSlikeDiv(item);
      }
    }
  }

  createDokumentDiv(item: any): void {
    const div = document.createElement('div');
    div.className = 'your-document-div-class';
    const divleft = document.createElement('div');
    div.appendChild(divleft);

    const divright = document.createElement('div');
    div.appendChild(divright);

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.innerText = 'description';

    const filePath = document.createElement('label');
    filePath.innerText = item.filePath;

    const downloadbtn = document.createElement('button');
    downloadbtn.className = 'downloadbtn';
    downloadbtn.innerHTML = 'PREUZMI';

    const iconn = document.createElement('span');
    iconn.className = 'material-symbols-outlined';


    downloadbtn.appendChild(iconn);


    downloadbtn.addEventListener('click', () => {
      this.downloadFile(item.filePath);
    });

    divleft.appendChild(icon);
    divleft.appendChild(filePath);
    divright.appendChild(downloadbtn);

    const parentElement = document.querySelector('.content.right-content');
    parentElement?.appendChild(div);
  }

  createSlikeDiv(item: any): void {
    const div = document.createElement('div');
    div.className = 'your-document-div-class';
    const divleft = document.createElement('div');
    div.appendChild(divleft);
  
    const divright = document.createElement('div');
    div.appendChild(divright);
  
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.innerText = 'image';
    console.log(item.filePath);
  
    const imgElement = document.createElement('img');
    imgElement.src = "../"+item.filePath;
  
    const downloadbtn = document.createElement('button');
    downloadbtn.className = 'downloadbtn';
    downloadbtn.innerHTML = 'PREUZMI';
  
    const iconn = document.createElement('span');
    iconn.className = 'material-symbols-outlined';

  
    downloadbtn.appendChild(iconn);
  
    downloadbtn.addEventListener('click', () => {
      this.downloadFile('Literatura/' + item.filePath);
    });
  
    divleft.appendChild(icon);
    divleft.appendChild(imgElement);
    divright.appendChild(downloadbtn);
  
    const parentElement = document.querySelector('.content.left-content');
    parentElement?.appendChild(div);
  }
  

  downloadFile(filePath: string): void {
    const link = document.createElement('a');
    link.href = filePath.replace(/\\/g, '/');
    
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    link.setAttribute('download', fileName);
     console.log(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  
  
  
  

 

 
}
