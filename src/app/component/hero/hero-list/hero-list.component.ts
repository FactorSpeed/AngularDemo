import { Component, OnInit, OnDestroy } from '@angular/core';

import { HeroService } from '../../../service/hero.service';
import { Hero } from "../../../entity/hero";
import { MessageService } from "../../../service/message.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {

  heroes: Hero[] = [];
  hero ?: Hero;
  view = 'detail';
  subscribe: Subscription[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.subscribe.push(this.heroService.findAll().subscribe(heroes => this.heroes = heroes));
  }

  ngOnDestroy(): void {
    this.subscribe.forEach((e) => {
      e.unsubscribe();
    })
  }

  onSelect(hero: Hero): void {
    this.hero = hero;
    this.view = 'list';
    this.messageService.add(`HeroList : ${this.hero.id} selected`)
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(e => e !== hero)
    this.subscribe.push(this.heroService.delete(hero.id).subscribe());
  }
}
