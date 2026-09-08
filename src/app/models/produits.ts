export interface Produits {
    id: number;
    modele: string;
    puissance: string;
    boite: string;
    prix: number;
    nprix?: number;
    gamme: string;
    autonomie?: string;
    image: string;
    quantite: number;
    etat?: string; // 'neuve' | 'occasion'
}
