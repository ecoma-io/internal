import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i === 0 ? 'admin' : i < 5 ? 'editor' : 'user',
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'pending',
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
  }));

  getUsers(page: number, itemsPerPage: number): Observable<{ data: IUser[], total: number }> {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = this.users.slice(start, end);

    return of({
      data: paginatedData,
      total: this.users.length
    }).pipe(delay(300)); // Simulate network delay
  }

  deleteUsers(ids: string[]): Observable<void> {
    this.users = this.users.filter(user => !ids.includes(user.id));
    return of(void 0).pipe(delay(300));
  }

  updateUserStatus(ids: string[], status: IUser['status']): Observable<void> {
    this.users = this.users.map(user => {
      if (ids.includes(user.id)) {
        return { ...user, status };
      }
      return user;
    });
    return of(void 0).pipe(delay(300));
  }
}