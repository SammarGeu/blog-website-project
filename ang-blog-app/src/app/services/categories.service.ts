import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private  firestore = inject(Firestore);

   loadData(): Observable<any[]> {
    const colRef = collection(this.firestore, 'categories');
    return collectionData(colRef, { idField: 'id' });
}
}

