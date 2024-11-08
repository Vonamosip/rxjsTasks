import { Component } from '@angular/core';
import { Observable, of, delay, switchMap, concatMap, timer, interval, take, map, mergeMap, pipe, exhaustAll, exhaustMap, repeat, filter } from 'rxjs';
import { SubjectService } from '../services/subject.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component {
  size$!: Observable<string>;
  a: string = '';
  constructor(private readonly subjectService: SubjectService) {}

  ngOnInit(): void {
    this.size$ = this.subjectService.a.pipe(
      map(size => `${size}px`)
    );
  }

  changeSize() {
    this.subjectService.changeSize();
  }

  displayedObservable$: Observable<number[]> = new Observable<number[]>();
  clickCount = 0;
  buffer:number[] = [];
  observable: Observable<number> = interval(1000).pipe(take(20));


  Subscribe() {
    this.clickCount++;

    if (this.clickCount === 1) {
      this.displayedObservable$ = this.observable.pipe(
        switchMap((num) => interval(200).pipe(
          map(() => num),
          map((value) => {
            this.buffer.push(value);
            return [...this.buffer]
          })
        ))
      );
    }

    else if (this.clickCount === 2) {
      this.displayedObservable$ = this.observable.pipe(
        concatMap(() => interval(100).pipe(take(10))),
        map((value) => {
          this.buffer.push(value);
          return [...this.buffer]
        })
      );
    }

    else if (this.clickCount === 3) {
      this.displayedObservable$ = this.observable.pipe(
        exhaustMap((val) => of(val).pipe(
          filter((num) => num % 2 === 0),
          delay(400), repeat(5),
          map((value) => {
            this.buffer.push(value);
            return [...this.buffer]
          })
        ))
      );
    }

    else if (this.clickCount === 4) {
      this.displayedObservable$ = this.observable.pipe(
        mergeMap((val) => of(val).pipe(
          delay(300), repeat(5),
          map((value) => {
            this.buffer.push(value);
            return [...this.buffer]
          })
        ))
      );

      this.clickCount = 0;
    }
  }

}
