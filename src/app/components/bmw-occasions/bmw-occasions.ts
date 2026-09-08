import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { Produits as ProduitModel } from '../../models/produits';

@Component({
  selector: 'app-bmw-occasions',
  standalone: true,
  imports: [],
  templateUrl: './bmw-occasions.html',
  styleUrl: './bmw-occasions.css',
})
export class BmwOccasions implements OnInit {
  allProducts: ProduitModel[] = [];
  filteredProducts: ProduitModel[] = [];
  selectedGamme: string = 'Tous';

  constructor(
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.applyFilter();
    this.loadProducts();
  }

  loadProducts() {
    this.produitService.getProducts().subscribe({
      next: (data) => {
        // Cette page affiche seulement les voitures d'occasion.
        this.allProducts = data.filter(p => p.etat === 'occasion');
        this.applyFilter();
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  selectGamme(gamme: string) {
    this.selectedGamme = gamme;
    this.applyFilter();
  }

  applyFilter() {
    // Filtre en memoire : changer de gamme ne relance pas la requete HTTP.
    if (this.selectedGamme === 'Tous') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(p =>
        p.gamme?.toLowerCase().includes(this.selectedGamme.toLowerCase())
      );
    }
  }
}
