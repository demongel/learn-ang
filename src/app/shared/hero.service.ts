import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Hero } from './hero';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // 通过构造函数注入 HttpClient
  constructor(private http: HttpClient) { }

  private heroesUrl = 'api/heroes';  // 内存数据库的REST API地址

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Hero[]>())
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => console.log(`添加 hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => console.log(`删除 hero id=${id}`)),
      catchError(this.handleError<any>('deleteHero', hero))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    hero.name = hero.name + (hero.id + 1)
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => console.log(`更新 hero id=${hero.id}`)),
        catchError(this.handleError('updateHero', hero))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T); // 返回一个可观察对象
    };
  }
}