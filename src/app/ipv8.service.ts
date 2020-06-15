import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

declare var sha1: any;

@Injectable({
  providedIn: 'root'
})
export class IPV8Service {

  private REST_API_SERVER = "http://localhost:8085/ipv8";

  constructor(private httpClient: HttpClient) { }
  
  public getOverlays(){
    return this.httpClient.get(this.REST_API_SERVER + '/overlays')
	  .pipe(map((res:any) => res.overlays));
  }
  
  public getPeers(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/peers')
	  .pipe(map((res:any) => res.peers));
  }
  
  public getCircuits(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/circuits')
	  .pipe(map((res:any) => res.circuits));
  }
  
  public getRelays(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/relays')
	  .pipe(map((res:any) => res.relays));
  }
  
  public getExits(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/exits')
	  .pipe(map((res:any) => res.exits));
  }

  public getSwarms(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/swarms')
	  .pipe(map((res:any) => res.swarms));
  }
  
  public getDHTStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/dht/statistics')
	  .pipe(map((res:any) => res.statistics));
  }

  public getBuckets(){
    return this.httpClient.get(this.REST_API_SERVER + '/dht/buckets')
	  .pipe(map((res:any) => res.buckets));
  }

  publicKeyToMidArray(pk_hex: string) {
    const pk_arr = pk_hex.match(/\w{2}/g).map(function (a) { return parseInt(a, 16) });
    return sha1(pk_arr).match(/\w{2}/g).map(function (a) { return parseInt(a, 16); });
  }

  publicKeyToMid(pk_hex: string): string {
    const mid_arr = this.publicKeyToMidArray(pk_hex);
    return Array.from(mid_arr, function(byte: any) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

  publicKeyToMid64(pk_hex: string) {
    const mid_arr = this.publicKeyToMidArray(pk_hex);
    return btoa(String.fromCharCode.apply(null, mid_arr));
  }

  hashToB64(hash_hex: string) {
    const hash_arr = hash_hex.match(/\w{2}/g).map(function (a) { return parseInt(a, 16) });
    return btoa(String.fromCharCode.apply(null, hash_arr));
  }
}