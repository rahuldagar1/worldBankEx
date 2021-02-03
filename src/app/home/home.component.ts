import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tableData: TableRow[] = [];
  page: number = 1;
  year: string = '';
  currentYear = '2020'
  totalPages:number =1;
  loading: boolean = false;
  progressSpinner:boolean = false;

  columnDefs = [
    { headerName: 'Country', field: 'name', sortable: true },
    { headerName: 'Population', field: 'population', sortable: true },
    { headerName: 'GDP (US$)', field: 'gdp', sortable: true }
  ];
  constructor(private configService: ConfigService) { }

  //making seperate call to fetch total pages to save time 
  //other option is we can make nested service call where the forkjoin call will happen after receiving total pages and passing them inot forkjoin call params
  //given time we can use loading spinner for ag grid so that it look better
  //and loading spinner will be shown only on grid instead of the page

  ngOnInit(): void {

    this.configService.getPopulation(this.year, this.page).subscribe(res=>{
      this.totalPages = res[0].total; // total here is the total number of data pages available 
    })
  }


  // assuming that total page number is same for both population api and gdp api
  searchYearDetails() {
    let currentYear = new Date();
    this.progressSpinner = true;
    if(parseInt(this.year) < currentYear.getFullYear() && parseInt(this.year) > 1970){
      forkJoin([this.configService.getPopulation(this.year, this.totalPages), this.configService.getGdp(this.year, this.totalPages)]).subscribe(
        res =>{

          if(res[0][1] === null){
            alert("please enter a different year");
          }
          else{
          this.tableDetails(res[0][1], res[1][1])
          }
        });
        err =>{
          console.log(err);
          this.progressSpinner = false;
        }
      }
    else {
      this.tableData = [];
      this.progressSpinner = false;
      alert("select a valid year");
    }
  }

  // tableDetails(population, gdp){ unblock this method if we assume that order of both population and gdp response is same
  //   this.tableData = [];
  //   for (let i=0; i<population.length; i++){
  //     let tableRow = new TableRow();
  //     tableRow.name = population[i].country.value;
  //     tableRow.population = population[i].value;
  //     tableRow.gdp = gdp[i].value;
  //     this.tableData.push(tableRow);
  //   }
  //     this.progressSpinner = false;

  // }


  tableDetails(population, gdp){ //assuming data from both apis is in different order but contains data for all countries 
    this.tableData = [];

    const populationData = population.sort((a,b)=>{ // considering ids to be unique  and same locale and 2 data will not have same id 
      if(a.country.id.toLowerCase() < b.country.id.toLowerCase()){
        return 1;
      }
      else {
        return -1;
      }
    });
    const gdpData = gdp.sort((a,b)=>{
      if(a.country.id.toLowerCase() < b.country.id.toLowerCase()){
        return 1;
      }
      else {
        return -1;
      }
    });
  for ( let i=0; i<populationData.length; i++) {
    let tableRow = new TableRow();
    tableRow.name = populationData[i].country.value;
    tableRow.population = populationData[i].value;
    tableRow.gdp = gdpData[i].value;
    this.tableData.push(tableRow);
  }
    this.progressSpinner = false;


  }


}
class TableRow {
  id: string = '';
  name: string= '';
  population: number = 0;
  gdp: number = 0;
}

