import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './shared/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from 'ng2-charts';

import { TriblerStatsComponent } from './tribler/tribler-stats.component';

import { TrustchainStatsComponent } from './trustchain/trustchain-stats.component';

import { Ipv8Component } from './ipv8/ipv8.component';
import { IPv8StatsComponent } from './ipv8/ipv8-stats.component';
import { OverlaysComponent } from './ipv8/overlays.component';

import { TunnelsComponent } from './tunnel/tunnels.component';
import { CircuitsComponent } from './tunnel/circuits.component';
import { RelaysComponent } from './tunnel/relays.component';
import { ExitsComponent } from './tunnel/exits.component'; 
import { SwarmsComponent } from './tunnel/swarms.component';
import { PeersComponent } from './tunnel/peers.component';

import { DHTComponent } from './dht/dht.component';
import { DHTStatsComponent } from './dht/dht-stats.component';
import { BucketsComponent } from './dht/buckets.component';

import { EventsComponent } from './event/events.component';

import { SystemComponent } from './system/system.component';
import { FilesComponent } from './system/files.component';
import { SocketsComponent } from './system/sockets.component';
import { ThreadsComponent } from './system/threads.component';
import { CPUComponent } from './system/cpu.component';
import { MemoryComponent } from './system/memory.component';
import { ProfilerComponent } from './system/profiler.component';


import { LibtorrentComponent } from './libtorrent/libtorrent.component';
import { SessionComponent } from './libtorrent/session.component';
import { SettingsComponent } from './libtorrent/settings.component';

import { LogsComponent } from './logs/logs.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,

    TriblerStatsComponent,

    TrustchainStatsComponent,

    Ipv8Component,	
    IPv8StatsComponent,
    OverlaysComponent,

    TunnelsComponent,	
    CircuitsComponent,
    RelaysComponent,
    ExitsComponent,
    SwarmsComponent,
    PeersComponent,
	
	DHTComponent,
	DHTStatsComponent,
	BucketsComponent,
	
	EventsComponent,

	SystemComponent,
	FilesComponent,
	SocketsComponent,
	ThreadsComponent,
	CPUComponent,
	MemoryComponent,
	ProfilerComponent,

	LibtorrentComponent,
	SessionComponent,
	SettingsComponent,
	
	LogsComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
	MatTableModule,
	MatListModule,
	MatTabsModule,
	MatSelectModule,
	LayoutModule,
	ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
