import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ajouter-produit',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './ajouter-produit.html',
    styleUrl: './ajouter-produit.css'
})
export class AjouterProduit {
    productForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private produitService: ProduitService,
        private router: Router
    ) {
        this.productForm = this.fb.group({
            modele: ['', Validators.required],
            puissance: ['', Validators.required],
            boite: ['Automatique', Validators.required],
            gamme: ['Essence', Validators.required],
            prix: [0, [Validators.required, Validators.min(0)]],
            etat: ['neuve', Validators.required],
            quantite: [1, [Validators.required, Validators.min(1)]],
            image: ['', Validators.required]
        });
    }

    onSubmit() {
        // Envoie le formulaire valide, puis revient au catalogue apres la reponse.
        if (this.productForm.valid) {
            this.produitService.addProduct(this.productForm.value).subscribe({
                next: () => {
                    alert('Produit ajouté avec succès !');
                    this.router.navigate(['/produits']);
                },
                error: (err) => {
                    alert('Erreur lors de l\'ajout du produit.');
                    console.error(err);
                }
            });
        }
    }
}
