import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Personaje } from 'src/app/Interface/Personaje';
import { getLocaleDateFormat } from '@angular/common';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  personajes: Personaje[] | undefined;
  personajesCopy: Personaje[] | undefined;


  constructor(public http: HttpClient) {
    this.getData();
  }

  async getData() {
    await this.http.get<any>(environment.apiUrl + "characters")
      .subscribe((res) => {

        this.personajes = res.map((r: Personaje) => {
          return {
            char_id: r.char_id,
            name: r.name,
            nickname: r.nickname,
            img: r.img,
            status: r.status,
            occupation: r.occupation,
          };
        });

        this.personajesCopy = this.personajes;

      });
  }

  filter(e: any) {
    const search: string = e.target.value;
    this.personajes = this.personajesCopy?.filter(({name} : Personaje) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
