import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { IMessage } from '../models/imessage';
import { IClient } from '../models/iclient';

const URL_WEBSOCKET = "ws://10.211.159.40:9000";


@Injectable()
export class ConnectionService {
	public messages: Subject<IMessage>;

	clients: IClient[] = [];
	platforms: IClient[] = [];
	controllers: IClient[] = [];
	viewers: IClient[] = [];

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<IMessage>>wsService
			.connect(URL_WEBSOCKET)
			.map((response: MessageEvent): IMessage => {
				console.log('mapping data' + response.data);
				let data = JSON.parse(response.data);
				console.log('mapeado' + data);
				return data;
			})
	}

	getUrl(): string {
		return URL_WEBSOCKET;
	}

	addClient(client: IClient, tipo:string){
		this.exist(client,this.clients) ? this.clients.push(client) : '';
		switch (tipo) {
			case "platform":
				this.exist(client,this.platforms) ? this.platforms.push(client) : '';
				//si la plataforma ya tiene asignado un controlador
				console.log('master de la plataforma');
				console.log(client.master);
				if(client.master){
					//enlazo al controlador(master) con la plataforma
					client.master.slave = client;
				}
			break;
			case "controller":
				this.exist(client,this.controllers) ? this.controllers.push(client) : '';
				//si el controlador ya tiene asignado una plataforma
				console.log('slave del controlador');
				console.log(client.slave);
				if(client.slave){
					//enlazo la plataforma(slave) con el controlador
					client.slave.master = client;
				}
			break;
			case "viewer":
				console.log('viewers');
				console.log(client);
				console.log(this.viewers);
				this.exist(client,this.viewers) ? this.viewers.push(client) : '';
				console.log('viewers');
				console.log(this.viewers);
			break;
		}
	}

	exist(client: IClient, list: IClient[]): boolean{
		var x = list.find(x => x.alias === client.alias);
		if(typeof x === "undefined")
			return true;
		else 
			return false;
	}

	getClient(alias:string): IClient{
		var x = this.clients.find(x => x.alias === alias);
		if(typeof x === "undefined")
			return null;
		else 
			return x;
	}

	getClients(tipo:string): IClient[]{
		switch (tipo) {
			case "platforms":
				return this.platforms;
			case "controllers":
				return this.controllers;
			case "viewers":
				return this.viewers;
			default:
				return this.clients;
		}
	}

	removeClient(alias: string){
		this.clients = this.clients.filter(obj => obj.alias !== alias);
		this.platforms = this.platforms.filter(obj => obj.alias !== alias);
		this.controllers = this.controllers.filter(obj => obj.alias !== alias);
		this.viewers = this.viewers.filter(obj => obj.alias !== alias);
	}

}
