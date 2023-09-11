import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public name = '';
  public list: string[] = [];
  public nouvelObjet: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.name = params.get('id') ?? '';
      this.getTheList();
    });
  }

  comeBackHome() {
    this.router.navigate(['/']);
  }

  private getTheList(): void {
    this.list = localStorage.getItem(this.name) != null ? JSON.parse(localStorage.getItem(this.name) ?? '') : [];
  }

  public addInList(): void {
    if(!!this.nouvelObjet && this.nouvelObjet.length >0){
      this.list = [...this.list, this.nouvelObjet];
      localStorage.setItem(this.name, JSON.stringify(this.list));
      this.getTheList();
      this.nouvelObjet = "";
    }
  }

  public clearList(): void {
    localStorage.removeItem(this.name);
    this.list = [];
  }

}
