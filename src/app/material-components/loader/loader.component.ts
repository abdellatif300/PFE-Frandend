import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() isLoading: boolean = true;

  ngOnInit() {
    // Simulate a delay and then hide the loader
    setTimeout(() => {
      this.isLoading = false;
    }, 1500); // Adjust the time duration as needed (in milliseconds)
  }
}
