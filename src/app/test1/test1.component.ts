import { SubjectService } from './../services/subject.service';
import { Component } from '@angular/core';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { filter, map, take, mergeMap, scan, withLatestFrom, tap, switchMap, combineLatestAll, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-test1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component {
  a: string = '';
  size$!: Observable<string>;

  constructor(private readonly subjectService: SubjectService) {}

  ngOnInit(): void {
    this.size$ = this.subjectService.a.pipe(
      map(size => `${size}px`)
    );
  }

  changeSize() {
    this.subjectService.a.next(this.subjectService.random());
  }



  displayedObservable$: Observable<number[]> = new Observable<number[]>();
  clickCount = 0;

  observable: Observable<number> = interval(100).pipe(take(20));

  private buffer: number[] = [];


  Subscribe() {
    this.clickCount++;
    this.buffer = [];
    if (this.clickCount === 1) {
      this.displayedObservable$ = this.observable.pipe(
        map((number) => number * 3),
        map((value) => {
          this.buffer.push(value);
          return [...this.buffer]
        })
      )
    }
    else if (this.clickCount === 2) {
      this.displayedObservable$ = this.observable.pipe(
        take(7),
        map((value) => {
          this.buffer.push(value);
          return [...this.buffer]
        })
      );
    }
    else if (this.clickCount === 3) {
      this.displayedObservable$ = this.observable.pipe(
        filter((x: number) => x % 2 === 0),
        map((value) => {
          this.buffer.push(value);
          return [...this.buffer]
        })
      );
      this.clickCount = 0;
    }
  }
}
