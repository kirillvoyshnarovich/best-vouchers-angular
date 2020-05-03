import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/providers/data/data.service';
import { BreakingChangeType } from 'graphql';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'bv-quick-links',
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
    // private location: Location
  ) {

    const url = this.router.url;
    // location.replaceState(url);
    if(url) {
      if (url.indexOf('/check-your-order') !== -1) {
        this.mode = 'check';
      }

      if (url.indexOf('/terms-and-services') !== -1) {
        this.mode = 'term';
      }

      if (url.indexOf('/privacy-policy') !== -1) {
        this.mode = 'private';
      }

      if (url.indexOf('/return-policy') !== -1) {
        this.mode = 'return';
      }

      if (url.indexOf('/delivery') !== -1) {
        this.mode = 'delivery';
      }

      if (url.indexOf('/contact') !== -1) {
        this.mode = 'contact';
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
      const formData = {...this.form.value};
    }
  }
}
