import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public random() {
    return +(Math.random() * 100).toFixed()
  }

  public a:Subject<number> = new BehaviorSubject<number>(10);
  //внутри компонента изменение subject +
  //внутри сервиса +

  //создание внутри сервиса +
  //создание внутри компонента

  public changeSize() {
    this.a.next(this.random());
  }

  constructor() { }
}

