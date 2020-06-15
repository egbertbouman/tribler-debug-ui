import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TriblerService {

  private REST_API_SERVER = "http://localhost:8085";
  events = [];

  constructor(private httpClient: HttpClient) {
    let source = new EventSource(this.REST_API_SERVER + '/events');
    source.addEventListener('message', message => {
		var event = JSON.parse(message.data);
		event['time'] = Math.round(Date.now() / 1000);
        this.events.push(event);
    });
  }
  
  public getDownloads(){
    return this.httpClient.get(this.REST_API_SERVER + '/downloads')
	  .pipe(map((res:any) => res.downloads));
  }
  
  public getTriblerStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/statistics/tribler')
	  .pipe(map((res:any) => res.tribler_statistics));
  }

  public getTrustchainStatistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/trustchain/statistics')
	  .pipe(map((res:any) => res.statistics));
  }

  public getIPv8Statistics(){
    return this.httpClient.get(this.REST_API_SERVER + '/statistics/ipv8')
	  .pipe(map((res:any) => res.ipv8_statistics));
  }

  public getLibtorrentSettings(hops: number){
    return this.httpClient.get(this.REST_API_SERVER + `/libtorrent/settings?hop=${hops}`)
	  .pipe(map((res:any) => res.settings));
  }

  public getLibtorrentSession(hops: number){
    return this.httpClient.get(this.REST_API_SERVER + `/libtorrent/session?hop=${hops}`)
	  .pipe(map((res:any) => res.session));
  }

  public getLog(process: string, max_lines: number){
    return this.httpClient.get(this.REST_API_SERVER + `/debug/log?process=${process}&max_lines=${max_lines}`)
	  .pipe(map((res:any) => res));
  }

  public getOpenFiles(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/open_files')
	  .pipe(map((res:any) => res.open_files));
  }

  public getOpenSockets(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/open_sockets')
	  .pipe(map((res:any) => res.open_sockets));
  }

  public getThreads(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/threads')
	  .pipe(map((res:any) => res.threads));
  }

  public getCPUHistory(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/cpu/history')
	  .pipe(map((res:any) => res.cpu_history));
  }

  public getMemoryHistory(){
    return this.httpClient.get(this.REST_API_SERVER + '/debug/memory/history')
	  .pipe(map((res:any) => res.memory_history));
  }

  public getEvents(){
    return Observable.create(observer => {
      const eventSource = new EventSource(this.REST_API_SERVER + '/events');
      eventSource.onmessage = x => observer.next(JSON.parse(x.data));
	  //eventSource.onmessage = x => { var event = JSON.parse(x.data); event['time'] = Math.round(Date.now() / 1000); observer.next(event); };
      //eventSource.onerror = x => observer.error(JSON.parse(x.data));
    });
  }
}
