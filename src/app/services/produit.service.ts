import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produits } from '../models/produits';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  // Les deux catalogues et le formulaire utilisent la meme collection locale.
  private apiUrl = 'http://localhost:3000/produits';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Produits[]> {
    return this.http.get<Produits[]>(this.apiUrl);
  }

  addProduct(produit: Produits): Observable<Produits> {
    return this.http.post<Produits>(this.apiUrl, produit);
  }
}
