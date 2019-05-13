import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models';
import { PracticeService } from '../../practice/practice.service';
import { Practice, DailySummary } from '../../models';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  @Input() practice: Practice;
  
  constructor(private practiceService: PracticeService) { }

  ngOnInit() { }

}
