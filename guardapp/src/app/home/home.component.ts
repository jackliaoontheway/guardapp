import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private guardService: GuardService) { }

  private interval = null;

  play: boolean;
  play2: boolean;

  processed: boolean;

  listenRFID() {
    if (this.processed) {
      console.log('in processing...');
      return;
    }
    this.processed = true;
    console.log('read rfid...');
    this.guardService.readRFID().subscribe((response) => {
      const hasData = JSON.parse(JSON.stringify(response)).hasData;
      const allPaided = JSON.parse(JSON.stringify(response)).allPaided;
      if (hasData) {
        this.play = true;
        console.log('has data');
        setTimeout(() => {
          this.play = false;
          setTimeout(() => {
            this.processed = false;
          },5000);
        }, 4000);
      } else if (allPaided) {
        this.play2 = true;
        console.log('all paided');
        setTimeout(() => {
          this.play2 = false;
          this.processed = false;
        }, 5000);
      } else {
        this.play = false;
        this.play2 = false;
        this.processed = false;
        console.log('else ....');
      }
    });
  }

  ngOnInit() {
    this.interval = setInterval( () => { this.listenRFID(); }, 1000);
  }

  ngOnDestroy(): void {
    this.play = false;
    this.play2 = false;
    clearInterval(this.interval);
  }

}
