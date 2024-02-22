import { Component, Input } from '@angular/core';
import { ShareService } from '../services/share.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  myForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    adress: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });

  message: string = "";
  emptymessage: boolean = false;
  
  constructor(private shareService: ShareService, private router:Router) {}

  onSubmit() {
    if (this.myForm.invalid) {

      this.emptymessage = true;
      return;
    }
    
    const username = this.myForm.value.username || '';
    const email = this.myForm.value.email || '';
    const adress = this.myForm.value.adress || '';
    const phone = this.myForm.value.phone || '';
    const formData = JSON.stringify(this.myForm.value);

    this.shareService.addUser(
      username,
      email,
      adress,
      phone
    ).subscribe(
      () => {
        console.log('Utilisateur ajouté avec succès !');
        this.message = "User Created !";
        this.emptymessage = false;
     
        this.myForm.reset();
        this.router.navigate(['/'])
        
      //  this.router.navigate(['/'])

      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        this.message = "User Does not Created !";
        this.emptymessage = false;
      }
    );
    console.log(formData)
  }


  updateUser(id: number, user: any) {
    this.shareService.updateUser(id, user).subscribe(
      () => {
        console.log('Utilisateur mis à jour avec succès !');
     
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
  
      }
    );
  }

}
