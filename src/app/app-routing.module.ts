import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TriblerStatsComponent } from './tribler/tribler-stats.component';
import { TrustchainStatsComponent } from './trustchain/trustchain-stats.component';
import { Ipv8Component } from './ipv8/ipv8.component';
import { TunnelsComponent } from './tunnel/tunnels.component';
import { DHTComponent } from './dht/dht.component';
import { EventsComponent } from './event/events.component';
import { SystemComponent } from './system/system.component';
import { LibtorrentComponent } from './libtorrent/libtorrent.component';
import { LogsComponent } from './logs/logs.component';


const routes: Routes = [
  { path: '', redirectTo: 'tribler', pathMatch: 'full'},
  { path: 'tribler', component: TriblerStatsComponent },
  { path: 'trustchain', component: TrustchainStatsComponent },
  { path: 'ipv8', component: Ipv8Component },
  { path: 'tunnel', component: TunnelsComponent },
  { path: 'dht', component: DHTComponent },
  { path: 'event', component: EventsComponent },
  { path: 'system', component: SystemComponent },
  { path: 'libtorrent', component: LibtorrentComponent },
  { path: 'logs', component: LogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
