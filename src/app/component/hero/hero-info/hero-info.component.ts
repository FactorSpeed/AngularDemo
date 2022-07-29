import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Hero} from "../../../entity/hero";
import {Location} from "@angular/common";
import {HeroService} from "../../../service/hero.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit {

  @Input() hero: Hero | undefined;
  @Input() view = 'detail';
  subscribe: Subscription[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private heroService: HeroService, private router: Router) {}

  ngOnInit() {
    if(this.hero === undefined) {
      const routeParams = this.route.snapshot.paramMap;
      const heroId = Number(routeParams.get('hero'));

      this.subscribe.push(this.heroService.findById(heroId).subscribe(hero => this.hero = hero));
    }
  }

  ngOnDestroy(): void {
    this.subscribe.forEach((e) => {
      e.unsubscribe();
    })
  }

  delete(): void {
    if(this.hero) {
      this.heroService.delete(this.hero.id).subscribe();
      this.router.navigate(['/heroes/all']).then();
    }
  }
}
