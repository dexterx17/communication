import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-preview',
  templateUrl: './client-preview.component.html',
  styleUrls: ['./client-preview.component.scss']
})
export class ClientPreviewComponent implements OnInit {

	alias: string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		let id = params['id'];
  		this.alias = id;
  	});

  }

}
