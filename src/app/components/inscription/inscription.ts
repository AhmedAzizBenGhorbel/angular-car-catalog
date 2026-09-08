import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      // Adapte les noms des champs du formulaire au format attendu par le service.
      const newUser = {
        nom: formValue.lastName,
        prenom: formValue.firstName,
        email: formValue.email,
        password: formValue.password,
        profile: 'user',
        valide: 'valide'
      };

      this.userService.register(newUser).subscribe({
        next: () => {
          alert('Compte créé ! Connectez-vous.');
          this.router.navigate(['/se-connecter']);
        },
        error: (err) => {
          alert('Erreur lors de la création du compte.');
          console.error(err);
        }
      });
    }
  }
}
