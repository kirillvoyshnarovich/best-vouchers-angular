import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import gql from 'graphql-tag';

@Component({
  selector: 'vsf-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @HostListener('window:resize', ['$event.target']) onResize(target: any) {
    this.calculateSizes();
    this.offsetDomElement = 'translateX(0%)';
  }

  // for action slider
  offsetDomElement = 'translateX(0%)';
  translateSlider: any = 0;
  maxStep = 0;
  // for action slider

  // define dimension slider
  currentWidthWindow: number = 0;
  stepInPercent = 0;
  countSlideView = 0;
  // define dimension slider


  topSellers = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.calculateSizes();

    this.dataService.query(GET_TOP_SELLERS)
    .subscribe((response) => {
      this.topSellers = response['search'].items;
      this.maxStep = this.topSellers.length - this.countSlideView;
    });
  }

  toggleSlider(next: any): void {
    if(next && this.translateSlider < this.maxStep) {
      this.translateSlider += 1;
      this.offsetDomElement = 'translate(-'+ this.stepInPercent*(this.translateSlider)+'%)';
    } else if(!next && this.translateSlider <= this.maxStep && 
      this.translateSlider > 0) {
      this.translateSlider -= 1;
      this.offsetDomElement = 'translate(-'+ this.stepInPercent*(this.translateSlider)+'%)';
    }
  }

  calculateSizes(): void {
    this.currentWidthWindow = window.innerWidth;

    if(this.currentWidthWindow > 1100) {
      this.stepInPercent = 20;
      this.countSlideView = 5;
    } else if(this.currentWidthWindow <= 1100 && this.currentWidthWindow > 900) {
      this.stepInPercent = 25;
      this.countSlideView = 4;
    } else  if(this.currentWidthWindow <= 900 && this.currentWidthWindow > 600) {
      this.stepInPercent = 33.4;
      this.countSlideView = 3;
    } else if(this.currentWidthWindow <= 600) {
      this.stepInPercent = 50;
      this.countSlideView = 2;
    }
  }
}

const GET_TOP_SELLERS = gql`
    query GetTopSellers {
        search(input: {
            take: 8,
            groupByProduct: true,
            sort: {
                price: ASC
            }
        }) {
            items {
                productId
                slug
                productAsset {
                    id
                    preview
                }
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productName
            }
        }
    }
`;

