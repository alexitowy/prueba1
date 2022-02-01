import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  formSearch!: FormGroup;
  data!: any[];
 
  constructor(
    private readonly githubService: GithubService,
    private readonly formBuilder: FormBuilder
    ){}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formSearch = this.formBuilder.group({
      q: ['', Validators.required],
      star: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(!this.formSearch.valid) {
      return;
    }
    this.githubService.search({ q: `+language:${this.formSearch.get('q')?.value}`, sort: 'stars', order: 'desc' }).subscribe(response => {

      this.data = response.items.filter((element: any) => element.stargazers_count > this.formSearch.get('star')?.value)  
                    .filter((el: any, index: number) => index <= 10)
    });
  }
}
