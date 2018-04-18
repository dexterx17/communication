export interface IClient {
	alias:string;
	tipo:string;
	ip:string;
	master: IClient;
	slave: IClient;
	lat?: number;
	lng?: number;
	alt?: number;
}
