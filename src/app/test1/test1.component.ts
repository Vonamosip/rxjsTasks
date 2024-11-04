import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map, take, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-test1',
  standalone: true,
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component {
  a: string = '';
  clickCount = 0;

  observable: Observable<number> = interval(100).pipe(take(20));



  observer = {
    next: (value: any) => {
      this.a += value + ' ';
    },
    complete: () => {
      console.log('Completed');
    }
  };

  Subscribe() {
    this.clickCount++;
    this.a = '';

    if (this.clickCount === 1) {

      this.observable.pipe(
        map((values: number) => values),
        map((value: number) => value * 3)
      ).subscribe(this.observer);

    }
      else if (this.clickCount === 2) {

      this.observable.pipe(
        map((values: number) => values),
        take(7)
      ).subscribe(this.observer);

    }
      else if (this.clickCount === 3) {

      this.observable.pipe(
        map((values: number) => values),
        filter((x: number) => x % 2 === 0)
      ).subscribe(this.observer);


      this.clickCount = 0;
    }
  }
}
