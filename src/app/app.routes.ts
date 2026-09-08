import { Routes } from '@angular/router';

import { Accueil } from './components/accueil/accueil';
import { Inscription } from './components/inscription/inscription';
import { Login } from './components/login/login';
import { Produits } from './components/produits/produits';
import { Gammes } from './components/gammes/gammes';
import { BmwOccasions } from './components/bmw-occasions/bmw-occasions';
import { AjouterProduit } from './components/ajouter-produit/ajouter-produit';

export const routes: Routes = [
    { path: '', component: Accueil },
    { path: 'inscription', component: Inscription },
    { path: 'se-connecter', component: Login },
    { path: 'produits', component: Produits },
    { path: 'gammes', component: Gammes },
    { path: 'bmw-occasions', component: BmwOccasions },
    // Le lien est masque hors connexion, mais cette route n'a pas encore de garde.
    { path: 'ajouter-produit', component: AjouterProduit },
];
