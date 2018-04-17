import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('drone',sanitizer.bypassSecurityTrustResourceUrl('assets/drone.svg'));
    iconRegistry.addSvgIcon('control',sanitizer.bypassSecurityTrustResourceUrl('assets/remote-control.svg'));
    iconRegistry.addSvgIcon('falcon',sanitizer.bypassSecurityTrustResourceUrl('assets/millennium-falcon.svg'));
    iconRegistry.addSvgIcon('robot',sanitizer.bypassSecurityTrustResourceUrl('assets/robot.svg'));
    iconRegistry.addSvgIcon('transformer',sanitizer.bypassSecurityTrustResourceUrl('assets/transformer.svg'));
    iconRegistry.addSvgIcon('eye',sanitizer.bypassSecurityTrustResourceUrl('assets/eye.svg'));
  	/*iconRegistry.addSvgIconSet(
  		sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );*/
  }

  ngOnInit() {
  }
}
