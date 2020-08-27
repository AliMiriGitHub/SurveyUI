import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseEndpoint = '';

  constructor(private http: HttpClient) { }

  login(credentials) {
    return this.http.post(this.getUrl("/api/account/login"), credentials);
  }

  getSurvey() {
    return this.http.get(this.getUrl(`/api/surveys/clientSurveys`))
  }

  createVote(vote) {
    return this.http.post(this.getUrl("/api/votes"), vote);
  }

  private getUrl(methodName) {
    return this.baseEndpoint + methodName;
  }
}
