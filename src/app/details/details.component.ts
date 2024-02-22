import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

userData:any
userId:number=0
message:string=''
delete:boolean=false
constructor(private shareService:ShareService, private route : ActivatedRoute, private router:Router ){}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.userId = Number(params.get('id')); 
    this.loadUserDetails(this.userId); 
  });
}
loadUserDetails(userId: number): void {
  this.shareService.getUserById(userId).subscribe(
    (data: any) => {
      this.userData = data;
    },
    (error) => {
      console.error('Error fetching user details:', error);
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
    this.router.navigate(['/'])
    
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
