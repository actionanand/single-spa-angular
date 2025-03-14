import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './popover.directive';
import { PopovercontainerComponent } from './popover-container/popover-container.component';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PopoverService } from '../../services/popover.service';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [PopoverDirective, PopovercontainerComponent],
  exports: [PopoverDirective, PopovercontainerComponent],
  providers: [Overlay, PopoverService]
})
export class PopoverModule {}
