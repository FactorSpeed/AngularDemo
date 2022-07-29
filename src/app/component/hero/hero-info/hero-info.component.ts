import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Hero, HEROES} from "../../../entity/hero";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit {

  @Input() hero: Hero | undefined;
  @Input() view = 'detail';

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    if(this.hero === undefined) {
      const routeParams = this.route.snapshot.paramMap;
      const heroId = Number(routeParams.get('hero'));

      this.hero = HEROES.find((hero) => hero.id === heroId);
    }
  }

  backPage(): void {
    this.location.back();
  }
}
