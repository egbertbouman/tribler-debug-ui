import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriblerStatsComponent } from './tribler/tribler-stats.component';

import { TrustchainStatsComponent } from './trustchain/trustchain-stats.component';

import { AsyncioComponent } from './asyncio/asyncio.component';
import { TasksComponent } from './asyncio/tasks.component';
import { SlowTasksComponent } from './asyncio/slow-tasks.component';
import { DriftComponent } from './asyncio/drift.component';

import { Ipv8Component } from './ipv8/ipv8.component';
import { IPv8StatsComponent } from './ipv8/ipv8-stats.component';
import { OverlaysComponent } from './ipv8/overlays.component';
import { OverlayStatsComponent } from './ipv8/overlay-stats.component';

import { TunnelsComponent } from './tunnel/tunnels.component';
import { CircuitsComponent } from './tunnel/circuits.component';
import { RelaysComponent } from './tunnel/relays.component';
import { ExitsComponent } from './tunnel/exits.component';
import { PeersComponent } from './tunnel/peers.component';
import { SwarmsComponent } from './tunnel/swarms.component';

import { DHTComponent } from './dht/dht.component';
import { DHTStatsComponent } from './dht/dht-stats.component';
import { BucketsComponent } from './dht/buckets.component';
import { RequestComponent } from './dht/request.component';

import { EventsComponent } from './event/events.component';

import { SystemComponent } from './system/system.component';
import { FilesComponent } from './system/files.component';
import { SocketsComponent } from './system/sockets.component';
import { ThreadsComponent } from './system/threads.component';
import { CPUComponent } from './system/cpu.component';
import { MemoryComponent } from './system/memory.component';
import { ProfilerComponent } from './system/profiler.component';

import { LibtorrentComponent } from './libtorrent/libtorrent.component';
import { SettingsComponent } from './libtorrent/settings.component';
import { SessionComponent } from './libtorrent/session.component';

import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'tribler', pathMatch: 'full'},
  { path: 'tribler', component: TriblerStatsComponent },
  { path: 'trustchain', component: TrustchainStatsComponent },
  {
    path: 'asyncio',
    component: AsyncioComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'drift' },
      { path: 'drift', pathMatch: 'full', component: DriftComponent },
      { path: 'all-tasks', pathMatch: 'full', component: TasksComponent },
      { path: 'slow-tasks', pathMatch: 'full', component: SlowTasksComponent },
    ]
  },
  {
    path: 'ipv8',
    component: Ipv8Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'ipv8-stats' },
      { path: 'ipv8-stats', pathMatch: 'full', component: IPv8StatsComponent },
      { path: 'overlays', pathMatch: 'full', component: OverlaysComponent },
      { path: 'overlay-stats', pathMatch: 'full', component: OverlayStatsComponent },
    ]
  },
  {
    path: 'tunnel',
    component: TunnelsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'circuits' },
      { path: 'circuits', pathMatch: 'full', component: CircuitsComponent },
      { path: 'relays', pathMatch: 'full', component: RelaysComponent },
      { path: 'exits', pathMatch: 'full', component: ExitsComponent },
      { path: 'swarms', pathMatch: 'full', component: SwarmsComponent },
      { path: 'peers', pathMatch: 'full', component: PeersComponent },
    ]
  },
  {
    path: 'dht',
    component: DHTComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dht-stats' },
      { path: 'dht-stats', pathMatch: 'full', component: DHTStatsComponent },
      { path: 'buckets', pathMatch: 'full', component: BucketsComponent },
      { path: 'request', pathMatch: 'full', component: RequestComponent },
    ]
  },
  { path: 'events', component: EventsComponent },
  {
    path: 'system',
    component: SystemComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'files' },
      { path: 'files', pathMatch: 'full', component: FilesComponent },
      { path: 'sockets', pathMatch: 'full', component: SocketsComponent },
      { path: 'threads', pathMatch: 'full', component: ThreadsComponent },
      { path: 'cpu', pathMatch: 'full', component: CPUComponent },
      { path: 'memory', pathMatch: 'full', component: MemoryComponent },
      { path: 'profiler', pathMatch: 'full', component: ProfilerComponent },
    ]
  },
  {
    path: 'libtorrent',
    component: LibtorrentComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'settings' },
      { path: 'settings', pathMatch: 'full', component: SettingsComponent },
      { path: 'session', pathMatch: 'full', component: SessionComponent },
    ]
  },
  { path: 'logs', component: LogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
