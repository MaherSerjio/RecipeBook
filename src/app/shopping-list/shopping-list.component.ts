import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients: Ingredient[];
  subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService ,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription  =   this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingService.printLog('Hello from Shopping List Component NgonInit');
  }
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

    onEditItem(index: number) {
      this.shoppingListService.startedEditing.next(index);
    }

}
