import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TriblerService {

  private REST_API_SERVER = '';
  private opts = {};
  events = [];

  constructor(private router: Router, private httpClient: HttpClient) {
    let apiKey = router.routerState.snapshot.root.queryParams.apikey;
    this.opts = {headers: {'X-Api-Key': apiKey}};

    const source = new EventSource(this.REST_API_SERVER + '/events?apikey=' + apiKey);
    source.addEventListener('message', message => {
        const event = JSON.parse(message.data);
        event.time = Math.round(Date.now() / 1000);
        this.events.push(event);
    });
  }

  public getDownloads(){
    return this.httpClient.get(this.REST_API_SERVER + '/downloads', this.opts)
      .pipe(map((res: any) => res.downloads));
  }

  public getTriblerStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/statistics/tribler', this.opts)
      .pipe(map((res: any) => res.tribler_statistics));
  }

  public getTrustchainStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/trustchain/statistics', this.opts)
      .pipe(map((res: any) => res.statistics));
  }

  public getIPv8Statistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/statistics/ipv8', this.opts)
      .pipe(map((res: any) => res.ipv8_statistics));
  }

  public getLibtorrentSettings(hops: number){
    return this.httpClient.get(this.REST_API_SERVER + `/libtorrent/settings?hop=${hops}`, this.opts)
      .pipe(map((res: any) => res.settings));
  }

  public getLibtorrentSession(hops: number){
    return this.httpClient.get(this.REST_API_SERVER + `/libtorrent/session?hop=${hops}`, this.opts)
      .pipe(map((res: any) => res.session));
  }

  public getLog(process: string, maxLines: number){
    return this.httpClient.get(this.REST_API_SERVER + `/debug/log?process=${process}&max_lines=${maxLines}`, this.opts)
      .pipe(map((res: any) => res));
  }

  public getOpenFiles(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/open_files', this.opts)
      .pipe(map((res: any) => res.open_files));
  }

  public getOpenSockets(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/open_sockets', this.opts)
      .pipe(map((res: any) => res.open_sockets));
  }

  public getThreads(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/threads', this.opts)
      .pipe(map((res: any) => res.threads));
  }

  public getCPUHistory(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/cpu/history', this.opts)
      .pipe(map((res: any) => res.cpu_history));
  }

  public getMemoryHistory(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/memory/history', this.opts)
      .pipe(map((res: any) => res.memory_history));
  }

  public startProfiler() {
    return this.httpClient.put(this.REST_API_SERVER + '/debug/profiler', {}, this.opts)
      .pipe(map((res: any) => res.success));
  }

  public stopProfiler() {
    return this.httpClient.delete(this.REST_API_SERVER + '/debug/profiler', this.opts)
      .pipe(map((res: any) => res.profiler_file));
  }

  public getProfilerState() {
    return this.httpClient.get(this.REST_API_SERVER + '/debug/profiler', this.opts)
      .pipe(map((res: any) => res.state));
  }
}
