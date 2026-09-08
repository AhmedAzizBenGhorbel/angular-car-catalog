import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  currentUser: Users | null = null;
  private userSubscription?: Subscription;

  constructor(
    private router: Router
  ) { }
  userService = inject(UserService);
  ngOnInit() {
    this.userSubscription = this.userService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy() {
    // Arrete l'ecoute lorsque le composant est detruit.
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
