import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges  {
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() columns: [Object];
  @Input() data: [];
  displayedColumns = [];
  trackKey: string;

  ngOnChanges(): void {
    this.displayedColumns = this.columns.map(c => c['name']);
	
	if (this.columns.length > 0 && this.table) {
	  var column;
	  var trackKey = this.columns[0]['key'];
	  for (column of this.columns)
        if (column['track'])
          trackKey = column['key'];
	  this.table.trackBy = function(index, obj) {return obj[trackKey];}
	}
  }
  
  getKeyFromData(key, data) {
	var subkey;
    for (subkey of key.split('.'))
        data = data[subkey];
    return data
  }
  
  getValue(column, data) {
	var key = column['key']
	var subkey;
    for (subkey of key.split('.'))
        data = data[subkey];
    return column['transform'] ? column['transform'](data) : data;
  }
  
  isBoolean(value) {
	return typeof value === 'boolean';
  };
}
