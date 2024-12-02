import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <div class="mb-2">
  <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
       placeholder="Buscar gifs..."
       (keyup.enter)="searchTag()"
       #txtTagInput
       />
  </div>


  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {


  constructor(private gifsService: GifsService){


  }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  searchTag(){
    const newTag = this.tagInput.nativeElement.value
    this.gifsService.searchTag(newTag)
    console.log({newTag})
    this.tagInput.nativeElement.value=''
  }

}
