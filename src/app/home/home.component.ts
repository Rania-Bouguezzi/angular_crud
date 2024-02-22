import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() showAddButton: boolean = true; 
  users: any[] = [];

userId:any
message:string=''
delete:boolean=false
  constructor(private shareService: ShareService, private route:ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {}

loadUsers(): void {
  this.shareService.getAllUsers().subscribe(
    (data: any[]) => {
      this.users = data; // Stocke les utilisateurs récupérés dans une variable locale
      
    },
    (error) => {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  );
}

deleteUser(id: number): void {
  const confirmation = window.confirm('You want to delete this user ?');
  if (confirmation) {

    this.shareService.deleteUser(id).subscribe(
      () => {
     this. message="User Deleted !"
    this.delete=true
        this.loadUsers();
    
      },
      error => {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      }
    );
  } else {
 
    console.log('Suppression annulée');
  }
}




}
