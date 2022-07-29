import { Component, OnInit, OnDestroy } from '@angular/core';
import {Hero} from "../../../entity/hero";
import {HeroService} from "../../../service/hero.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit, OnDestroy {

  hero: Hero;
  submitted = false;
  action: string = 'Add';
  subscribe: Subscription[] = [];

  constructor(private heroService: HeroService, private location: Location, private router: Router, private route: ActivatedRoute) {
    this.hero = new Hero(0, '');
  }

  ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      if(routeParams.get('hero') !== null) {
        const heroId = Number(routeParams.get('hero'));
        this.subscribe.push(this.heroService.findById(heroId).subscribe(hero => this.hero = hero));
        this.action = 'Edit';
      }
  }

  ngOnDestroy(): void {
    this.subscribe.forEach((e) => {
      e.unsubscribe();
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.hero.id === 0) this.create();
    else this.update();
  }

  create(): void {
    this.subscribe.push(this.heroService.create(this.hero).subscribe())
    this.redirect()
  }

  update(): void {
    this.subscribe.push(this.heroService.update(this.hero).subscribe())
    this.redirect()
  }

  redirect() {
    this.router.navigate(['/heroes/' + this.hero.id + '/details']);
  }
}
