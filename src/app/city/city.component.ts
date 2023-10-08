import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { backend } from 'src/environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpHeaders  } from '@angular/common/http';
import { CityService } from './city.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface CityElements {
  id: number;
  name: string;
  img_path: string;
}


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  displayedColumns: string[] = ['id', 'name', 'img_path', 'image','action'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  public dataSource = new MatTableDataSource<CityElements>();

  //exampleDatabase: CityHttpDatabase | null;
  data: CityElements[] = [];
  rawData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  VOForm: FormGroup;
  isEditableNew: boolean = true;

 

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   {id: 1, name: 'Hydrogen', img_path: 'H'},
  //   {id: 2, name: 'Helium', img_path: 'He'},
  //   {pidosition: 3, name: 'Lithium', img_path: 'Li'}
  // ];

  constructor(private cityService: CityService, private fb: FormBuilder,private _formBuilder: FormBuilder) {}

  ngOnInit(): void{
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });

    // this.VOForm = this.fb.group({
    //   VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({
    //     position: new FormControl(val.position),
    //     name: new FormControl(val.name),
    //     weight: new FormControl(val.weight),
    //     symbol: new FormControl(val.symbol),
    //     action: new FormControl('existingRecord'),
    //     isEditable: new FormControl(true),
    //     isNewRow: new FormControl(false),
    //   })
    //   )) //end of fb array
    // });

    this.getCityData();

  }

  buildForm(){
    //console.log(this.rawData);
    
    this.rawData.forEach(element => {
     console.log(element)
    });
  }

  getCityData(){
    this.cityService.getCityList()
      .subscribe((res)=>{
        this.rawData = res;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       
        this.buildForm();
      })
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  export interface CityApi {
    items: CityElements[];
    total_count: number;
  }

