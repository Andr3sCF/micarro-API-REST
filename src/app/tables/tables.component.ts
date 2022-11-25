import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

  constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'ID', 'Nombre', 'Ciudad', 'Carro'],
          dataRows: [
              ['1', 'Dakota Rice', 'Bogotá', 'Chevrolet tracker'],
              ['2', 'Minerva Hooper', 'Bogotá', 'BMW'],
              ['3', 'Sage Rodriguez', 'Bogotá', 'Mazda'],
              ['4', 'Philip Chaney', 'Bogotá', 'Ford'],
              ['5', 'Doris Greene', 'Bogotá', 'Chevrolet Bolt EUV'],
              ['6', 'Mason Porter', 'Bogotá', 'Renault']
          ]
      };
  }

}
