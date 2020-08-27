import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ScriptService } from '../scripts/script.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  surveys: any[];
  phoneNo: string;

  constructor(private router:Router, private _formBuilder: FormBuilder, private service: ApiService, private script: ScriptService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.service.getSurvey().subscribe((res: any[]) => {
      this.surveys = res;
      this.surveys.forEach((survey => {
        survey.answers = []
      }))
    })

    this.script.load('particles').then(data => {
    }).catch(error => console.log(error));
  }

  saveSurveys() {
    this.surveys.forEach((survey) => {
      if (survey.type.name == 'Checkbox') {
        survey.templates.forEach((template) => {
          if (template.checked) {
            survey.answers.push(template.id)
          }
        });
      }
    });
    var questions = this.surveys.map(s => ({
      surveyId: s.id,
      answers: s.answers
    }));
    var voter = {
      phone: this.phoneNo,
      name: ''
    }
    var vote = {
      voter: voter,
      questions: questions
    }
    this.service.createVote(vote).subscribe(res => {
      this.service.getSurvey().subscribe((res: any[]) => {
        this.surveys = res;
        this.surveys.forEach((survey => {
          survey.answers = []
        }))
      });
    })

  }
}
