import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  firestore  = inject(Firestore)

  constructor() { }

  loadFeatured(): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    const featuredQuery = query(postsRef, where('isFeatured', '==', true),limit(4));
    return collectionData(featuredQuery, { idField: 'id' });
  }

  loadLatest(): Observable<any[]> {

    const postsRef = collection(this.firestore, 'posts');
    const featuredQuery = query(postsRef, orderBy('createdAt', 'desc'));
    return collectionData(featuredQuery, { idField: 'id' });
  } 

  loadCategoryPosts(categoryId: any): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    const categoryQuery = query(postsRef, where('category.categoryId', '==', categoryId));
    return collectionData(categoryQuery, { idField: 'id' });
  } 

  loadOnePost(postId: string): Observable<any> {
    const docRef = doc(this.firestore, `posts/${postId}`);
    return docData(docRef, { idField: 'id' }); // Optional: add `idField` if needed
  }

  loadSimilar(catId:string){
    const postsRef = collection(this.firestore, 'posts');
    const categoryQuery = query(postsRef, where('category.categoryId', '==', catId));
    return collectionData(categoryQuery, { idField: 'id' });
   
   
  }

  countViews(postId: string) {
    const postRef = doc(this.firestore, `posts/${postId}`);
    const viewsCount = {
      views: increment(1)
    };

    updateDoc(postRef, viewsCount)
      .then(() => {
       // console.log('Views count updated successfully');
      })
      .catch((error) => {
       // console.error('Failed to update views count:', error);
      });
  }
}
