import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IPV8Service {

  private REST_API_SERVER = '/ipv8';
  private opts = {};

  constructor(private router: Router, private httpClient: HttpClient) {
    this.opts = {headers: {'X-Api-Key': router.routerState.snapshot.root.queryParams.apikey}};
  }

  public enableDrift(enable: boolean){
    return this.httpClient.put(this.REST_API_SERVER + '/asyncio/drift', {enable}, this.opts)
      .pipe(map((res: any) => res.success));
  }

  public getDrift(){
    return this.httpClient.get(this.REST_API_SERVER + '/asyncio/drift', this.opts)
      .pipe(map((res: any) => res.measurements));
  }

  public getTasks(){
    return this.httpClient.get(this.REST_API_SERVER + '/asyncio/tasks', this.opts)
      .pipe(map((res: any) => res.tasks));
  }

  public setAsyncioDebug(params){
    return this.httpClient.put(this.REST_API_SERVER + '/asyncio/debug', params, this.opts)
      .pipe(map((res: any) => res.success));
  }

  public getAsyncioDebug(){
    return this.httpClient.get(this.REST_API_SERVER + '/asyncio/debug', this.opts)
      .pipe(map((res: any) => res));
  }

  public getOverlays(){
    return this.httpClient.get(this.REST_API_SERVER + '/overlays', this.opts)
      .pipe(map((res: any) => res.overlays));
  }

  public getOverlayStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/overlays/statistics', this.opts)
      .pipe(map((res: any) => res.statistics));
  }

  public getPeers(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/peers', this.opts)
      .pipe(map((res: any) => res.peers));
  }

  public getCircuits(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/circuits', this.opts)
      .pipe(map((res: any) => res.circuits));
  }

  public getRelays(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/relays', this.opts)
      .pipe(map((res: any) => res.relays));
  }

  public getExits(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/exits', this.opts)
      .pipe(map((res: any) => res.exits));
  }

  public getSwarms(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/swarms', this.opts)
      .pipe(map((res: any) => res.swarms));
  }

  public getDHTStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/dht/statistics', this.opts)
      .pipe(map((res: any) => res.statistics));
  }

  public getBuckets(){
    return this.httpClient.get(this.REST_API_SERVER + '/dht/buckets', this.opts)
      .pipe(map((res: any) => res.buckets));
  }

  public lookupDHTValue(hash){
    return this.httpClient.get(this.REST_API_SERVER + `/dht/values/${hash}`, this.opts)
      .pipe(map((res: any) => res));
  }
}
