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

  listenRFID() {
    console.log('read rfid...');
    this.guardService.readRFID().subscribe((response) => {
      const hasData = JSON.parse(JSON.stringify(response)).hasData;
      if (hasData) {
        this.play = true;
      } else {
        this.play = false;
      }
    });
  }

  ngOnInit() {
    this.interval = setInterval( () => { this.listenRFID(); }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
