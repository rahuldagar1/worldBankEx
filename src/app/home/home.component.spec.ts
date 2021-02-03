import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {ConfigService} from '../config/config.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of } from 'rxjs'
//import { of} from 'rxjs/operators'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
   let mockService;
   let mockPopulation = [{
    "page": 1,
    "pages": 1,
    "per_page": 264,
    "total": 20,
    "sourceid": "2",
    "lastupdated": "2020-12-16"
}, [{
    "indicator": {
        "id": "SP.POP.TOTL",
        "value": "Population, total"
    },
    "country": {
        "id": "1A",
        "value": "Arab World"
    },
    "countryiso3code": "ARB",
    "date": "2019",
    "value": 427870270,
    "unit": "",
    "obs_status": "",
    "decimal": 0
}, {
    "indicator": {
        "id": "SP.POP.TOTL",
        "value": "Population, total"
    },
    "country": {
        "id": "S3",
        "value": "Caribbean small states"
    },
    "countryiso3code": "CSS",
    "date": "2019",
    "value": 7401383,
    "unit": "",
    "obs_status": "",
    "decimal": 0
}]
];

  beforeEach(async () => {
   

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[HttpClientTestingModule],
      providers: [{provide:ConfigService}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockService = TestBed.get(ConfigService);
  });
  it('component to be created', ()=>{
    expect(component).toBeTruthy();
  });
  it('should call get population service', fakeAsync(() => {
    let spyObject = spyOn(mockService,'getPopulation').and.returnValue(of(mockPopulation));
    let spy2 = spyOn(mockService.getPopulation(),'subscribe');
    component.ngOnInit();
    tick();

    expect(spyObject).toHaveBeenCalledBefore(spy2)
    expect (spy2).toHaveBeenCalled();

  }));


  // we can write more test cases to see the response of both the calls
  //checking the variables values and check methods are called and they do the correct work
  
});
