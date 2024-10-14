import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FooterService } from '../../Services/footer.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy {
  showFooter: boolean = true;
  subscription: Subscription;

  constructor(private footerServes: FooterService, private spinner: NgxSpinnerService) {
    this.subscription = this.footerServes.showFooter.subscribe((value) => {
      this.showFooter = value;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.footerServes.displayFooter()
  }

  openSpinner1() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
