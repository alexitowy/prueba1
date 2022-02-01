import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GithubService } from './services/github.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let service: GithubService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [GithubService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call method onSubmit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const appSpy = spyOn(app, 'onSubmit').and.callThrough();
    app.formSearch = new FormGroup({
      q: new FormControl('java'),
      star: new FormControl('123543')
    })
    app.onSubmit();
    expect(appSpy).toHaveBeenCalled();
  });

  it('should call method onSubmit if form invalid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.formSearch = new FormGroup({
      q: new FormControl('', Validators.required),
      star: new FormControl('', Validators.required)
    })
    app.onSubmit();
    expect(app.formSearch.invalid).toBeTrue();
  });

  it('should call method onSubmit if form valid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(GithubService);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const appSpy = spyOn(app, 'onSubmit').and.callThrough();
    const serviceSpy = spyOn(service, 'search').and.returnValue(of({ items: [
      {
        stargazers_count : 12
      },
      {
        stargazers_count : 45
      }
    ]}))
    app.formSearch = new FormGroup({
      q: new FormControl('java', Validators.required),
      star: new FormControl('12', Validators.required)
    })
    app.onSubmit();
    expect(serviceSpy).toHaveBeenCalled();
    expect(appSpy).toHaveBeenCalled();
  });


});
