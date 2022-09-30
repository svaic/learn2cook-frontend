import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {doLogout} from "../../state-managment/auth/auth-actions";
import {Router} from "@angular/router";
import {showNotification} from "../../state-managment/notification/notification-actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userState$ = this.store.select("auth");
  hasArchivedCertificate = false;

  constructor(private store: Store<{ auth: any }>, private _router: Router) {
  }

  ngOnInit(): void {
    this.userState$.subscribe(userState => {
      if (!userState.currUser) {
        this._router.navigateByUrl("/login");
        return;
      }

      if (userState.currUser.hasArchivedCertificate) {
        this.hasArchivedCertificate = true;
      }

      if (userState.currUser && userState.currUser.hasArchivedCertificate) {
        this.hasArchivedCertificate = true;
        this.store.dispatch(showNotification({
          title: 'Честитки',
          text: 'Со освојување на 500 поени добивате сертификат за апсолвирање на овој курс',
          color: 'success'
        }))
      }
    })
  }

  goToHome() {
    this._router.navigateByUrl("/home");
  }

  goToSettings() {
    this._router.navigateByUrl("/settings");
  }

  getRoute(): string {
    return this._router.url;
  }

  logout() {
    this.store.dispatch(doLogout());
  }

  downloadCertificate(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://images.sampletemplates.com/wp-content/uploads/2016/11/certificate-3.jpg');
    link.setAttribute('download', `certificatez.jpg`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
