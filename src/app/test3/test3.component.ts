import { Component } from '@angular/core';
import { interval, take, map, Observable, forkJoin, combineLatest, zip } from 'rxjs';

@Component({
  selector: 'app-test3',
  standalone: true,
  imports: [],
  templateUrl: './test3.component.html',
  styleUrl: './test3.component.scss'
})
export class Test3Component {
  a: string = '';

  observable: Observable<number> = interval(1000).pipe(take(20));

  source1:Observable<number> = interval(200).pipe(take(10));
  source2:Observable<number> = interval(300).pipe(take(10));
  source3:Observable<number> = interval(400).pipe(take(10));

  Subscribe(){
    // forkJoin([this.source1, this.source2, this.source3]).subscribe({
    //   next: (res) => {
    //     this.a = `[${res.join(',')}]`;
    //   }
    // });
    // combineLatest([this.source1, this.source2, this.source3]).subscribe({
    //   next: (res) => {
    //     this.a = `[${res.join(',')}]`;
    //   }
    // });
    // zip([this.source1, this.source2, this.source3]).subscribe({
    //   next: (res) => {
    //     this.a = `[${res.join(',')}]`;
    //   }
    // });
  }
}
