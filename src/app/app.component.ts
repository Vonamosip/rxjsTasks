import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Test3Component } from "./test3/test3.component";
import { Test2Component } from "./test2/test2.component";
import { Test1Component } from "./test1/test1.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Test3Component, Test2Component, Test1Component,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';
}
