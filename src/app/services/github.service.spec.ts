import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { KeyPath } from '../models/keypath.model';

import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call search method ', () => {
    service.search({ q: 'java'}).subscribe((result:any) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${KeyPath.SEARCH}?q=java`);
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });
});
