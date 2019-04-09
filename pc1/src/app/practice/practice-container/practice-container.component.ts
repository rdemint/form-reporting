import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PracticeService } from '../practice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Practice } from '../../models';

@Component({
  selector: 'app-practice-container',
  templateUrl: './practice-container.component.html',
  styleUrls: ['./practice-container.component.css']
})
export class PracticeContainerComponent implements OnInit {
	practices: any;
  
  constructor(private practiceService: PracticeService) {
      this.practices = practiceService.loadPracticeList();
      console.log(this.practices);
    }

  ngOnInit() {
  }

  postPractice(practice) {
  	this.practiceService.postPractice(practice);
  }

  deletePractice(practiceSlug) {
    this.practiceService.deletePractice(practiceSlug);
  }

}
