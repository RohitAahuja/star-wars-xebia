import { Component, OnInit } from '@angular/core';
import { UserService, DataService, PagerService } from '../services';
import { Observable, interval, timer } from 'rxjs';
import { IUser, IPlanets } from '../models';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FilterPipePipe } from '../pipe/filter-pipe.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  currentUser$: Observable<IUser>;
  loading = true;
  planets: IPlanets[];
  filterPlanets: IPlanets[];
  pager: any = {};
  searchBy: string;
  pagedItems: any[];
  filter = new FilterPipePipe();
  populationSlab = 10000;
  height = 50;
  constructor(
    private router: Router,
    private userService: UserService,
    private dataService: DataService,
    private pagerService: PagerService
  ) {}
  ngOnInit() {
    this.userService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(currentUser => {
        if (!currentUser) {
          this.router.navigate(['/']);
        }
      });
    this.planets = this.dataService.getLocalPlanets();
    this.filterPlanets = JSON.parse(JSON.stringify(this.planets));
    if (this.planets && !this.planets.length) {
      this.getPlanets();
    } else {
      this.userService.setLoadingState(false);
      this.setPage(1);
    }
  }

  setPage(page: number, resetPagesCount?: number) {
    if (page < 1 || page > (resetPagesCount || this.pager.totalPages)) {
      return;
    }

    this.pager = this.pagerService.getPager(this.filterPlanets.length, page);
    this.pagedItems = this.filterPlanets.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  changeToDiv() {
    this.filterPlanets = this.filter.transform(
      this.planets,
      { name: this.searchBy },
      false
    );
    if (this.filterPlanets.length < this.planets.length) {
      this.filterPlanets.forEach(planet => {
        if (planet.population !== 'unknown') {
          this.populationSlab = 10000;
          this.height = 55;
          planet.height = this.convertToHeight(+planet.population);
        } else {
          planet.height = this.height;
        }
      });
    } else if (this.searchBy === '') {
      this.filterPlanets.forEach(planet => {
        planet.height = 50;
      });
    }
    this.setPage(1, 1);
  }

  private getPlanets(url?: string) {
    this.dataService
      .getPlanets(url)
      .pipe(take(1))
      .subscribe(data => {
        if (data.results) {
          this.planets.push(...(data.results as IPlanets[]));
        }
        if (data.next) {
          this.getPlanets(data.next);
        } else {
          this.userService.setLoadingState(false);
          this.dataService.setPlanetsLocally(this.planets);
          this.filterPlanets = JSON.parse(JSON.stringify(this.planets));
          this.setPage(1);
        }
      });
  }

  convertToHeight(populationCount: number): number {
    if (populationCount < this.populationSlab) {
      return this.height;
    } else {
      this.populationSlab *= 10;
      this.height += 5;
      this.convertToHeight(populationCount);
    }
  }
}
