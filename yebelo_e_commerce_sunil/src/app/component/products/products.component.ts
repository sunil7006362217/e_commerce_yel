import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
      console.log("Product ",this.searchKey);
    })
  }
  addtocart(item: any){
    this.cartService.spinnerDisplayStatus(true);
    this.cartService.addtoCart(item);
    setTimeout(()=>{
      this.cartService.spinnerDisplayStatus(false);
    },5000)
    
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      // console.log("product filter",a)
      if(a.category == category || category==''){
        console.log("product filter",a)
        return a;
       
      }
    })
  }

}
