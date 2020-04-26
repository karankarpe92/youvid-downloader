import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService implements HttpInterceptor {
  private REST_API_SERVER = "https://";
  private httpOptions = {
    headers: new HttpHeaders({
      responseType: "json",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "7fba68f20bmsh644db43347c2ef4p1ff20fjsn511aabdd4605",
    }),
  };

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // request = request.clone({
    //   setHeaders: {
    //     "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    //     "x-rapidapi-key": "7fba68f20bmsh644db43347c2ef4p1ff20fjsn511aabdd4605",
    //   },
    // });
    return next.handle(request);
  }

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest(url) {
    return this.httpClient.get(this.REST_API_SERVER + url, this.httpOptions);
  }
}
