import { Component, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Output() pass2Parent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getElement(ref: HTMLHeadingElement) {
    this.pass2Parent.emit(ref);
  };

}
