import { Component, OnInit } from '@angular/core';

import { HeroService } from '../../../service/hero.service';
import {Hero} from "../../../entity/hero";
import {MessageService} from "../../../service/message.service";

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[] = [];
  hero ?: Hero;
  view = 'detail';

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  onSelect(hero: Hero): void {
    this.hero = hero;
    this.view = 'list';
    this.messageService.add(`HeroList : ${this.hero.id} selected !`)
  }
}
