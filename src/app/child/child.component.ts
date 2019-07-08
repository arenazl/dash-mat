import { Component, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @ViewChild ('buttonRef', null) buttonRef;
  @Output() pass2Parent = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  getElement()
  {
    this.pass2Parent.emit((this.buttonRef as ElementRef));
  }

}
