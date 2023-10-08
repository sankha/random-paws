import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CityService } from '../city/city.service';

@Component({
  selector: 'app-city2',
  templateUrl: './city2.component.html',
  styleUrls: ['./city2.component.scss']
})
export class City2Component {
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  private sortingOrder;

  constructor(private cityService: CityService){
    this.columnDefs=[
      {
        headerName: "ID",
        field: "id",
        width: 100,
        getQuickFilterText: params => {
            return params.value.name;
        },
        sortingOrder: ["asc", "desc"]
      },
      {
        headerName: "Name",
        field: "name",
        filter: true, 
        editable: true,
        width: 150
      },
      {
        headerName: "URL",
        field: "img_path",
        filter: true, 
        editable: true,
        width: 550
      },
      {
        headerName: "Image",
        field: "url",
        cellRenderer: params => {
            console.log(params)
            return '<img src="' + params.data.img_path + '" width="150" height="80" />';
        },
        width: 300
      }
      
    ]
  }

  
  onCellValueChanged(obj){
      this.cityService.editCity(obj.data);
  }


  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.cityService.getCityList().subscribe(data=>{
      params.api.setRowData(data);
    });
   
  }
}
