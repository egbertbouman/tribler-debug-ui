import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TriblerService {

  private REST_API_SERVER = '';
  events = [];
  dialogRef = undefined;

  constructor(private httpClient: HttpClient) {
    const source = new EventSource(this.REST_API_SERVER + '/events');
    source.addEventListener('message', message => {
        const event = JSON.parse(message.data);
        event.time = Math.round(Date.now() / 1000);
        this.events.push(event);
    });
  }

  public getState(){
    return this.httpClient.get(this.REST_API_SERVER + '/state');
  }

  public getDownloads(){
    return this.httpClient.get(this.REST_API_SERVER + '/downloads')
      .pipe(map((res: any) => res.downloads));
  }

  public getTriblerStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/statistics/tribler')
      .pipe(map((res: any) => res.tribler_statistics));
  }

  public getBandwidthStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/bandwidth/statistics')
      .pipe(map((res: any) => res.statistics));
  }

  public getIPv8Statistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/statistics/ipv8')
      .pipe(map((res: any) => res.ipv8_statistics));
  }

  public getLibtorrentSettings(hops: number){
    return this.httpClient.get(this.REST_API_SERVER + `/libtorrent/settings?hop=${hops}`)
      .pipe(map((res: any) => res.settings));
  }

  public getLibtorrentSession(hops: number){
    return this.httpClient.get(this.REST_API_SERVER + `/libtorrent/session?hop=${hops}`)
      .pipe(map((res: any) => res.session));
  }

  public getLog(process: string, maxLines: number){
    return this.httpClient.get(this.REST_API_SERVER + `/debug/log?process=${process}&max_lines=${maxLines}`)
      .pipe(map((res: any) => res));
  }

  public getOpenFiles(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/open_files')
      .pipe(map((res: any) => res.open_files));
  }

  public getOpenSockets(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/open_sockets')
      .pipe(map((res: any) => res.open_sockets));
  }

  public getThreads(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/threads')
      .pipe(map((res: any) => res.threads));
  }

  public getCPUHistory(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/cpu/history')
      .pipe(map((res: any) => res.cpu_history));
  }

  public getMemoryHistory(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/memory/history')
      .pipe(map((res: any) => res.memory_history));
  }

  public startProfiler() {
    return this.httpClient.put(this.REST_API_SERVER + '/debug/profiler', {})
      .pipe(map((res: any) => res.success));
  }

  public stopProfiler() {
    return this.httpClient.delete(this.REST_API_SERVER + '/debug/profiler')
      .pipe(map((res: any) => res.profiler_file));
  }

  public getProfilerState() {
    return this.httpClient.get(this.REST_API_SERVER + '/debug/profiler')
      .pipe(map((res: any) => res.state));
  }
}
