import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({  //Decorator
  selector: 'my-heroes',  //css selector
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit{  //Component
 // name = 'Angular';
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  //private heroService: HeroService;
  
  constructor(private router:Router,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero):void{
    this.selectedHero = hero;
  }

  getHeroes(): void {
   // this.heroes = this.heroService.getHeroes();  //before async
   // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes); //after async, simulating slow server
   this.heroService.getHeroes().then(heroes => this.heroes = heroes);  //after async
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return ;}
    this.heroService.create(name).then(hero => {
                          this.heroes.push(hero);
                          this.selectedHero = null;
    });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
    });
  }

}
