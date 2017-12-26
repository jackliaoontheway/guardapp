import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { GuardService } from '../services/guard.service';

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

  listenRFID() {
    console.log('read rfid...');
    this.guardService.readRFID().subscribe((response) => {
      const hasData = JSON.parse(JSON.stringify(response)).hasData;
      const allPaided = JSON.parse(JSON.stringify(response)).allPaided;
      if (hasData) {
        this.play = true;
      } else if (allPaided) {
        this.play2 = true;
      }else {
        this.play = false;
        this.play2 = false;
      }
    });
  }

  ngOnInit() {
    this.interval = setInterval( () => { this.listenRFID(); }, 3000);
  }

  ngOnDestroy(): void {
    this.play = false;
    this.play2 = false;
    clearInterval(this.interval);
  }

}
