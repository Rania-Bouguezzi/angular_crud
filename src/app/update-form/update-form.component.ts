import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit{

  myFormUp = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    adress: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });





userId:number=0
userData:any
message:string=''
constructor(private shareService:ShareService, private route:ActivatedRoute, private router:Router){}

ngOnInit(): void {
  this.userId = this.route.snapshot.params['id']; // Convertissez l'ID en nombre
  console.log(this.userId);
  this.shareService.getUserById(this.userId).subscribe(data => {  //data récupère les données de user spécifique par ID
   this.userData = data;

    this.myFormUp.patchValue({
      username: this.userData.username,
      email: this.userData.email,
      adress: this.userData.adress,
      phone: this.userData.phone
    });
  });
}



  update(): void {
    if (this.myFormUp.invalid) {
this.message='Formulaire Invalid !'
      return;
    }

    const updatedUserData = this.myFormUp.value;

    this.shareService.updateUser(this.userId, updatedUserData).subscribe(
      () => {
        console.log('Utilisateur mis à jour avec succès !');
        this.message='User Updated!'
        this.router.navigate(['/'])
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        this.message='User Does Not Updated !'
       
      }
    );
  }
}
