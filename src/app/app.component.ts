import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isFormCollapsed : boolean = true;

  toggleForm(){
    this.isFormCollapsed = !this.isFormCollapsed
    return this.isFormCollapsed;
  }
}
