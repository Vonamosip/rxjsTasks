import { Component } from '@angular/core';
import { interval, take, map, Observable, forkJoin, combineLatest, zip } from 'rxjs';
import { SubjectService } from '../services/subject.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.scss']
})
export class Test3Component {
  a: string = '';
  size: string = '';

  constructor(private readonly subjectService: SubjectService) {
    this.subjectService.a.subscribe((size) => {
      this.size = `${size}px`;
    });
  }

  changeSize() {
    this.subjectService.a.next(this.subjectService.random());
  }

  displayedObservable$!: Observable<string>;
  source1: Observable<number> = interval(200).pipe(take(10));
  source2: Observable<number> = interval(300).pipe(take(10));
  source3: Observable<number> = interval(400).pipe(take(10));
  clickCount = 0;

  Subscribe() {
    this.clickCount = (this.clickCount + 1) % 3;

    if (this.clickCount === 0) {
      this.displayedObservable$ = forkJoin([this.source1, this.source2, this.source3]).pipe(
        map((res) => `[${res.join(', ')}]`)
      );
    } else if (this.clickCount === 1) {
      this.displayedObservable$ = combineLatest([this.source1, this.source2, this.source3]).pipe(
        map((res) => `[${res.join(', ')}]`)
      );
    } else if (this.clickCount === 2) {
      this.displayedObservable$ = zip([this.source1, this.source2, this.source3]).pipe(
        map((res) => `[${res.join(', ')}]`)
      );
    }
  }
}
