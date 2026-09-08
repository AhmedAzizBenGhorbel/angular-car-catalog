import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // API locale de demonstration : la collection s'appelle "Users" dans db.json.
    private apiUrl = 'http://localhost:3000/Users';
    // Partage l'utilisateur connecte avec le header pour actualiser le menu.
    private currentUserSubject = new BehaviorSubject<Users | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        // localStorage existe uniquement dans le navigateur.
        if (isPlatformBrowser(this.platformId)) {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUserSubject.next(JSON.parse(savedUser));
            }
        }
    }

    login(email: string, password: string): Observable<Users | null> {
        // Connexion de demonstration : comparaison cote client, sans authentification serveur.
        return this.http.get<Users[]>(this.apiUrl).pipe(
            map(users => {
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    this.currentUserSubject.next(user);
                    if (isPlatformBrowser(this.platformId)) {
                        // Le compte entier est conserve, mot de passe inclus : utiliser des comptes fictifs.
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    return user;
                }
                return null;
            })
        );
    }

    register(user: Users): Observable<Users> {
        return this.http.post<Users>(this.apiUrl, user);
    }

    logout() {
        this.currentUserSubject.next(null);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('currentUser');
        }
    }

    getCurrentUser(): Users | null {
        return this.currentUserSubject.value;
    }
}
