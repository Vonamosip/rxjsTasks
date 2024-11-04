import { Component } from '@angular/core';
import { Observable, of, delay, switchMap, concatMap, timer, interval, take, map, mergeMap, pipe, exhaustAll, exhaustMap, repeat, filter } from 'rxjs';

@Component({
  selector: 'app-test2',
  standalone: true,
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component {
  a: string = '';

  observable: Observable<number> = interval(1000).pipe(take(20));

  observer = {
    next: (value: number) => {
      this.a += value + ' ';
    },
    complete: () => {
      console.log('Completed');
    }
  };

  Subscribe() {
    // this.observable.pipe(
    //   switchMap((num) => interval(200).pipe(
    //     map(() => num)
    //   ))
    // ).subscribe(this.observer)

    // this.observable.pipe(
    //     concatMap(() => interval(100).pipe(take(10))),
    // ).subscribe(this.observer)

    // this.observable.pipe(
    //   exhaustMap((val) => of(val).pipe(
    //     filter((num) => num % 2 == 0),
    //     delay(400), repeat(5)))
    //   ).subscribe(this.observer)

    // this.observable.pipe(
    //   mergeMap((val) => of(val).pipe(
    //     delay(300),repeat(5))
    //   )
    // ).subscribe(this.observer)
  }
}
