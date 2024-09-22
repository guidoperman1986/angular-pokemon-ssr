import { isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export default class PricingComponent implements OnInit {
  private title = inject(Title);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    if (isPlatformServer(this.platform)) {
      console.log('I am a server!');
      this.title.setTitle('Pricing Page');
    } else {
      console.log('I am a browser!');
      document.title = 'Pricing Page';
    }
  }
}
