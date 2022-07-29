import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../entity/hero';
import {MessageService} from "./message.service";
import { catchError, tap } from 'rxjs/operators';
import {InMemoryDataService} from "./in-memory-data.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  heroes: Hero[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private inMemoryDataService: InMemoryDataService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.findAll().subscribe(heroes => this.heroes = heroes);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  create(hero: Hero): Observable<any> {
    hero.id = this.generateId();
    this.heroes.push(hero)
    return this.http.post(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`create ${hero.id}`)),
        catchError(this.handleError<Hero>(`create ${hero.name}`))
      )
  }

  update(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update ${hero.id}`)),
        catchError(this.handleError<Hero>(`update ${hero.name}`))
      )
  }

  delete(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`delete ${id}`)),
        catchError(this.handleError<Hero>(`delete ${id}`))
      )
  }

  findById(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`findById ${id}`)),
        catchError(this.handleError<Hero>(`findById ${id}`))
      );
  }

  findAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('findAll')),
        catchError(this.handleError<Hero[]>('findAll', []))
      );
  }

  generateId(): number {
    return this.inMemoryDataService.genId(this.heroes);
  }
}
