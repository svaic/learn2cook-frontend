import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class ImageSendService {

  constructor(private httpClient: HttpClient) { }

  sendFile(username: string, receiptId: string, image: File) {

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("receiptId", receiptId);

    return this.httpClient.post<User>(environment.apiURL + 'image/receipt', formData);
  }
}
