import { Component, Input } from '@angular/core';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private shareService: ShareService){}



  addUser(){
    
  }
}
