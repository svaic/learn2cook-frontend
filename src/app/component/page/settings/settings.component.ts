import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user/user";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../state-managment/auth/auth-reducer";
import {MealPeriod} from "../../../model/user/mealPeriod";
import {updateUserData} from "../../../state-managment/auth/auth-actions";
import {UserService} from "../../../service/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user?: User;
  breakfast: MealPeriod = {} as MealPeriod;
  lunch: MealPeriod = {} as MealPeriod;
  dinner: MealPeriod = {} as MealPeriod;
  isVegan: boolean = false;

  constructor(private store: Store<{ auth: AuthState }>, private userService: UserService, private _router: Router) {
    this.store.select(x => x.auth.currUser).subscribe(x => {
      this.user = x;
      this.breakfast = ({...x.settings.breakfast});
      this.lunch = ({...x.settings.lunch});
      this.dinner = ({...x.settings.dinner});
      this.isVegan = x.settings.vegan;
      console.log(x)
    });
  }

  ngOnInit(): void {
  }

  save() {
    const settings = ({...this.user!.settings, breakfast: this.breakfast, lunch: this.lunch, dinner: this.dinner, vegan: this.isVegan});
    const tempUser = ({...this.user, settings: settings})
    this.store.dispatch(updateUserData(tempUser))
    this.userService.updateSettings(settings).subscribe(x=>x);
  }

  goToHome() {
    this._router.navigateByUrl("/home");
  }
}
