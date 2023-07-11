import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class OwnService {

  // 通过构造函数注入 HttpClient
  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/hero';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => console.log(`添加 hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Hero[]>())
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => console.log(`删除 hero id=${id}`)),
      catchError(this.handleError<any>('deleteHero', hero))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.url}/${id}`;
    return this.http.put<Hero>(url, hero, this.httpOptions)
      .pipe(
        tap(_ => console.log(`更新 hero id=${hero.id}`)),
        catchError(this.handleError('updateHero', hero))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.body.error} status ${error.status}`);
      return of(result as T); // 返回一个可观察对象
    };
  }
}


