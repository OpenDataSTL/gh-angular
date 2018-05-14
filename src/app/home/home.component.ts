import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: 'YourSTLCourts provides ticket information for the St. Louis region. ' +
        'Search by city, ticket number or driver\'s license number. Get reminders by text message.'},
      {name: 'author', content: 'CivTechStl'},
      {name: 'keywords', content: 'st. louis courts, st louis courts, court, municipal court, ' +
        'st. louis ticket, traffic ticket, st. louis county, missouri'}
    ]);
  }

}
