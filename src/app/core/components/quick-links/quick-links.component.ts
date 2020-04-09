import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/providers/data/data.service';
import { BreakingChangeType } from 'graphql';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'vsf-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss'],
})
export class QuickLinksComponent implements OnInit {
  form: FormGroup;
  mode: any = null;

  listLocation = [
    {
      loc: 'Български',
      email: 'contact.bg@thebestvouchers.com'
    },
    {
      loc: 'Français',
      email: 'contact.fr@thebestvouchers.com'
    },
    {
      loc: 'Hrvatski',
      email: 'contact.hr@thebestvouchers.com'
    },
    {
      loc: 'Magyar',
      email: 'contact.hu@thebestvouchers.com'
    },
    {
      loc: 'Český',
      email: 'contact.cz@thebestvouchers.com'
    },
    {
      loc: 'Polska',
      email: 'contact.pl@thebestvouchers.comm'
    },
    {
      loc: 'Latviešu',
      email: 'contact.lv@thebestvouchers.com'
    },
    {
      loc: 'Português',
      email: 'contact.pt@thebestvouchers.com'
    },
    {
      loc: 'Ελληνικά',
      email: 'contact.gr@thebestvouchers.com'
    },
    {
      loc: 'Italiano',
      email: 'contact.it@thebestvouchers.com'
    },
    {
      loc: 'Română',
      email: 'contact.ro@thebestvouchers.com'
    },
    {
      loc: 'Slovenský',
      email: 'contact.sk@thebestvouchers.com'
    },
    {
      loc: 'Slovenščina',
      email: 'contact.sl@thebestvouchers.com'
    },
    {
      loc: 'Lietuvių',
      email: 'contact.lt@thebestvouchers.com'
    },
    {
      loc: 'Español',
      email: 'contact.es@thebestvouchers.com'
    },
    {
      loc: 'English',
      email: 'contact.en@thebestvouchers.com'
    },
    {
      loc: 'Turkish',
      email: 'contact.tr@thebestvouchers.com'
    },
    {
      loc: 'Eesti',
      email: 'contact.ee@thebestvouchers.com'
    },
    {
      loc: 'Deutsch',
      email: 'contact.de@thebestvouchers.com'
    },
    {
      loc: 'Indonesia',
      email: 'contact.id@thebestvouchers.com'
    },
  ];

  subscruption:any = null;

  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) {

    const url = this.router.url;
    // location.replaceState(url);
    if(url) {
      switch(url){
        case '/check-your-order': this.mode = 'check'
          break;
        case '/terms-and-services': this.mode = 'term'
          break;
        case '/privacy-policy': this.mode = 'private'
          break;
        case '/return-policy': this.mode = 'return'
          break;
        case '/delivery': this.mode = 'delivery'
          break;
        case '/contact': this.mode = 'contact'
          break;
        default: this.mode = null;
          break;
      }
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    });
  }

  submit() {
    if (this.form.valid){
      console.log('Form', this.form);
      const formData = {...this.form.value};
      console.log('formData', formData);
    }
  }
}
