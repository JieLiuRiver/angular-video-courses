import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18Service } from '../services/i18.service';

const DEFAULT_LANGUAGE = 'zh'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit {
  selectedLanguage: string = DEFAULT_LANGUAGE;
  languages = ['en', 'zh'];

  constructor(private translate: TranslateService, private i18Service: I18Service) {
    translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.i18Service.changeLocale(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    //
    setTimeout(() => {
      this.i18Service.changeLocale(this.translate.currentLang);
    }, 100)
  }

  switchLanguage() {
    this.i18Service.changeLocale(this.selectedLanguage);
  }

}
