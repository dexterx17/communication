import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { WebsocketService } from '../../services/websocket.service';
import { Constantes } from '../../shared/constantes';
import { IClient } from '../../models/iclient';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
    providers: [WebsocketService, ConnectionService]
})
export class MainContentComponent implements OnInit {

    url_websocket: string;
    isConnected: boolean = false;
    isAuth: boolean = false;

    clients: IClient[] = [];
    platforms: IClient[] = [];
    controllers: IClient[] = [];
    viewers: IClient[] = [];

    lat: number = -0.9357917;
    lng: number = -78.6124162
    zoom:number = 17;

    constructor(private connectionService: ConnectionService) {

        this.url_websocket = connectionService.getUrl();

        connectionService.messages.subscribe(msg => {
            this.isConnected = true;
            console.log('Response from websocket: ' + msg);
            switch (msg.ev) {
                case Constantes.MSG_IDENTIFICACION:
                    console.log('ID:: ');
                    this.connectionService.addClient({ alias: msg.id, tipo: msg.tipo, ip: msg.ip, master: null, slave: null }, msg.tipo);
                    break;
                case Constantes.MSG_DESCONEXION:
                    console.log('desc:: ');
                    this.connectionService.removeClient(msg.id);
                    this.clients = this.connectionService.getClients('clients');
                    this.platforms = this.connectionService.getClients('platforms');
                    this.controllers = this.connectionService.getClients('controllers');
                    this.viewers = this.connectionService.getClients('viewers');
                    break;
                case Constantes.MSG_LISTADO_CLIENTES:
                    console.log('LIST:: ');
                    for (var i = 0; i < msg.clients.length; ++i) {
                        var c = msg.clients[i];
                        var master = this.connectionService.getClient(c.master);
                        var slave = this.connectionService.getClient(c.slave);
                        this.connectionService.addClient({ alias: c.alias, tipo: c.tipo, ip: c.ip, master: master, slave: slave }, c.tipo);
                    }
                    break;
                case Constantes.MSG_INSTRUCCION:
                    console.log('INST: ');
                    break;
                case Constantes.MSG_ESTADO:
                    console.log('STAT: ');
                    var client = this.platforms.find(x => x.alias === msg.alias);
                    if(typeof client !== 'undefined'){
                        client.lat = msg.lat;
                        client.lng = msg.lng;
                        client.alt = msg.alt;
                    }
                break;
                default:
                    console.log('evento no indentificado');
                    console.log(msg);
                    break;
            }
        });
    }

    ngOnInit() {
        this.clients = this.connectionService.getClients('clients');
        this.platforms = this.connectionService.getClients('platforms');
        this.controllers = this.connectionService.getClients('controllers');
        this.viewers = this.connectionService.getClients('viewers');
    }

    initAs(tipo: string) {
        let message = {
            ev: 'id',
            client: 'drone',
            tipo: tipo
        }
        this.connectionService.messages.next(message);
        this.isAuth = true;
    }

}