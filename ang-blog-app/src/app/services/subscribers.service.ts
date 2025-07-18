import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { query } from '@angular/fire/firestore';
import { where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private firestore = inject(Firestore);

  constructor() {}

  addSubs(subData: any) {
    const subsRef = collection(this.firestore, 'subscribers');
    
    return addDoc(subsRef, subData)
      .then(() => {
       // console.log('Subscriber added successfully');
      })
      .catch((error) => {
       // console.error('Failed to add subscriber:', error);
      });
  }

  checkSubs(subEmail: string): Observable<any[]> {
    const subsRef = collection(this.firestore, 'subscribers');
    const q = query(subsRef, where('email', '==', subEmail));
    return collectionData(q, { idField: 'id' });
  }
}
