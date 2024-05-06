import { trigger, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    './../../../assets/css/bootstrap.min.css',
    './../../../assets/css/animate.css',
    './../../../assets/css/owl.carousel.min.css',
    './../../../assets/css/themify-icons.css',
    './../../../assets/css/flaticon.css',
    './../../../assets/css/magnific-popup.css',
    './../../../assets/css/slick.css',
    './../../../assets/css/style.css'
  ],
  animations: [
    trigger('count', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  teacherCount = 0;
  studentCount = 0;
  onlineCount = 0;
  companyCount = 0;

  ngOnInit(): void {
    // Trigger the animation for each counter
    this.triggerAnimation('teacherCount', 11);
    this.triggerAnimation('studentCount', 10);
    this.triggerAnimation('onlineCount', 11);
    this.triggerAnimation('companyCount', 4);
  }

  triggerAnimation(property: string, finalValue: number): void {
    const duration = 500; // Animation duration in milliseconds
    const steps = 100; // Number of steps for the animation
    const increment = finalValue / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      this[property] = Math.round(currentStep * increment);

      if (currentStep++ === steps) {
        clearInterval(interval);
        this[property] = finalValue; // Ensure the final value is set
      }
    }, duration / steps);
  }

  [key: string]: any;

}
