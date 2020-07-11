import { Component, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges  {
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() columns: any[] = [];
  @Input() data: [] = [];
  @Input() undefinedStr = 'N/A';
  @Input() hoverable = false;
  @Output() rowClick = new EventEmitter();
  displayedColumns = [];
  sortedData = [];
  sort;
  trackKey: string;

  ngOnChanges(): void {
    this.displayedColumns = this.columns.map((c: any) => c.key);
    this.sortData(this.sort);

    if (this.columns.length > 0 && this.table) {
      let trackKey = this.columns[0].key;
      let column;
      for (column of this.columns) {
        if (column.track) {
          trackKey = column.key;
        }
      }
      this.table.trackBy = (index, obj) => obj[trackKey];
    }
  }

  toString(value) {
    return value === undefined ? 'undefined' : value.toString();
  }

  sortData(sort) {
    this.sort = sort;
    const data = this.data.slice();
    if (!sort?.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if (sort.active) {
        return this.compare(this.getRawValue(a, {key: sort.active}) || '',
                            this.getRawValue(b, {key: sort.active})	|| '', isAsc);
      }
      return 0;
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getRawValue(row, column) {
    let value = row;
    for (const subkey of column.key.split('.')) {
        value = value[subkey];
    }
    return value;
  }

  getValue(row, column) {
    const value = this.getRawValue(row, column);
    return (column.transform && value !== undefined) ? column.transform(value, row) : value;
  }

  isBoolean(value) {
    return typeof value === 'boolean';
  }

  onRowClicked(row) {
    this.rowClick.emit(row);
  }
}
