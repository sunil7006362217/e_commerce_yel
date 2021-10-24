import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public spinner = new BehaviorSubject<Boolean>(false);

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  spinnerDisplayStatus(status:any){
      this.spinner.next(status);
  }

  getSpinnerStatus(){
    return this.spinner.asObservable();
  }
  // setProduct(product : any){
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // } 
  // m_length:Number = 0;
  addtoCart(product : any){
    let m_length = 0;
    if(this.cartItemList.length <= 0){
      this.cartItemList.push(product); 
    }
   
    this.cartItemList.map((p:any) => {
      m_length++;
      console.log("sunil",p.quantity)
      if(p.id == product.id){
        console.log("sunil if",p.quantity)
        p.quantity = p.quantity + 1;
        p.total = p.total + p.price;
      }else{
        if(this.cartItemList.length == m_length){
        console.log("sunil else",p.quantity+m_length+this.cartItemList.lengthS)
        this.cartItemList.push(product);
        }
      }
    })
   
    
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  setQuanity(){
    
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
