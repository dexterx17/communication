import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;


@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

	@ViewChild(MatSidenav) sidenav: MatSidenav;
	constructor(zone: NgZone,private router: Router) {
		this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
	}

	ngOnInit() {
		this.router.events.subscribe(() => {
	      if(this.isScreenSmall())
	        this.sidenav.close();
	    });
	}


	isScreenSmall(): boolean {
	  	return this.mediaMatcher.matches;
	}

}
