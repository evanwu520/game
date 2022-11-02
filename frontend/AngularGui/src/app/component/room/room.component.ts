import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoomViewModel } from './room.viewmodel';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  @Input()
  viewModel: RoomViewModel

  private ngUnsubscribe = new Subject<void>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
    const source = interval(300);
    source.pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(() => {
      this.viewModel.updateRemaindTime();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

}
