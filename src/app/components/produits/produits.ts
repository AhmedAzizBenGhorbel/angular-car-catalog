import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../services/produit.service';
import { Produits as ProduitModel } from '../../models/produits';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produits.html',
  styleUrl: './produits.css',
})
export class Produits implements OnInit {
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
        // Cette page affiche seulement les voitures neuves.
        this.allProducts = data.filter(p => p.etat === 'neuve');
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
