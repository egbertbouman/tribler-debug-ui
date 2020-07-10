import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IPV8Service {

  private REST_API_SERVER = '/ipv8';

  constructor(private httpClient: HttpClient) {
  }

  public enableDrift(enable: boolean){
    return this.httpClient.put(this.REST_API_SERVER + '/asyncio/drift', {enable})
      .pipe(map((res: any) => res.success));
  }

  public getDrift(){
    return this.httpClient.get(this.REST_API_SERVER + '/asyncio/drift')
      .pipe(map((res: any) => res.measurements));
  }

  public getTasks(){
    return this.httpClient.get(this.REST_API_SERVER + '/asyncio/tasks')
      .pipe(map((res: any) => res.tasks));
  }

  public setAsyncioDebug(params){
    return this.httpClient.put(this.REST_API_SERVER + '/asyncio/debug', params)
      .pipe(map((res: any) => res.success));
  }

  public getAsyncioDebug(){
    return this.httpClient.get(this.REST_API_SERVER + '/asyncio/debug')
      .pipe(map((res: any) => res));
  }

  public getOverlays(){
    return this.httpClient.get(this.REST_API_SERVER + '/overlays')
      .pipe(map((res: any) => res.overlays));
  }

  public getOverlayStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/overlays/statistics')
      .pipe(map((res: any) => res.statistics));
  }

  public getPeers(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/peers')
      .pipe(map((res: any) => res.peers));
  }

  public getCircuits(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/circuits')
      .pipe(map((res: any) => res.circuits));
  }

  public getRelays(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/relays')
      .pipe(map((res: any) => res.relays));
  }

  public getExits(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/exits')
      .pipe(map((res: any) => res.exits));
  }

  public getSwarms(){
    return this.httpClient.get(this.REST_API_SERVER + '/tunnel/swarms')
      .pipe(map((res: any) => res.swarms));
  }

  public getDHTStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/dht/statistics')
      .pipe(map((res: any) => res.statistics));
  }

  public getBuckets(){
    return this.httpClient.get(this.REST_API_SERVER + '/dht/buckets')
      .pipe(map((res: any) => res.buckets));
  }

  public lookupDHTValue(hash){
    return this.httpClient.get(this.REST_API_SERVER + `/dht/values/${hash}`)
      .pipe(map((res: any) => res));
  }
}
