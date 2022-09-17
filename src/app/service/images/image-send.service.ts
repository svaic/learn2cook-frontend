import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageSendService {

  constructor(private httpClient: HttpClient) { }

  sendFile(username: string, receiptId: number, image: File) {

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("receiptId", receiptId.toString());

    return this.httpClient.post(environment.apiURL + 'image/receipt', formData);
  }
}
