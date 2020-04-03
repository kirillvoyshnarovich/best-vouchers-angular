import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import gql from 'graphql-tag';

@Component({
  selector: 'vsf-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  offsetBestSellerSlider = 'translateX(0%)';
  stepTranslateBestSellerSlider: any = 0;
  amountBestSellerSlider = 0;
  topSellers = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    console.log('init slider @@@');
    this.dataService.query(GET_TOP_SELLERS)
    .subscribe((response) => {
        console.log('response', response);
        this.topSellers = response['search'].items;
        this.amountBestSellerSlider = this.topSellers.length -5;
        console.log('this.topSellers.length', this.topSellers.length);
    });
  }


  // for slider in below
  toggleBestSelerSlider(next: any): void {
    if(next && this.stepTranslateBestSellerSlider < this.amountBestSellerSlider) {
      this.stepTranslateBestSellerSlider += 1;
      this.offsetBestSellerSlider = 'translate(-'+ 20*(this.stepTranslateBestSellerSlider)+'%)';
    } else if(!next && this.stepTranslateBestSellerSlider <= this.amountBestSellerSlider && 
      this.stepTranslateBestSellerSlider > 0) {
      this.stepTranslateBestSellerSlider -= 1;
      this.offsetBestSellerSlider = 'translate(-'+ 20*(this.stepTranslateBestSellerSlider)+'%)';
    }
  }
  // for slider in below

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

