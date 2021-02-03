import {ConfigService} from './config.service';
import {TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('ConfigService',() => {
    let service:ConfigService;
    let httpTestingController:HttpTestingController;
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
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                ConfigService
            ]
        });
     service = TestBed.get(ConfigService);
     httpTestingController = TestBed.get(HttpTestingController); 

    });

    
    it('should retrieve  population data', () => {

        service.getPopulation(2019, 1)
            .subscribe(response => {

                expect(response).toBeTruthy();
                expect(response[0].total).toBeGreaterThan(0);

            });

        const req = httpTestingController.expectOne((req) =>req.urlWithParams==='http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2019&per_page=1');

        expect(req.request.method).toEqual("GET");

        req.flush(mockPopulation);

    });

    afterEach(() => {

        httpTestingController.verify();
    });

})