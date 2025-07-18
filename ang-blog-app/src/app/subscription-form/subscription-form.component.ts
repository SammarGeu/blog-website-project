import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss'
})
export class SubscriptionFormComponent {

  isEmailError: boolean = false;
  isSuccess: boolean = false;

  name:string='';

  constructor(private subService: SubscribersService) {}

  onSubmit(form: any) {
    const subData: Sub = {
      name: form.value.name,
      email: form.value.email
    };
      this.name = subData.name;
    // Take only the first emitted value and complete
    this.subService.checkSubs(subData.email).pipe(take(1)).subscribe(val => {
      if (val.length === 0) {
        // Subscriber doesn't exist
        this.subService.addSubs(subData).then(() => {
          console.log('Subscriber added successfully');
          this.isSuccess = true;
          form.reset(); // Optional
        }).catch((error) => {
          console.error('Failed to add subscriber:', error);
        });
      } else {
        this.isEmailError = true;
        console.log('Subscriber already exists');
        // Optionally show UI feedback
      }
    });
  }
}
