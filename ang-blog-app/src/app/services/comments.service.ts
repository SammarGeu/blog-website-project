import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, orderBy, collectionData, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { BlogComment } from '../models/Blogcom';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private firestore: Firestore) {}

  addComment(comment:BlogComment) {
    const commentRef = collection(this.firestore, 'comments');
    return addDoc(commentRef, comment);
  }

  getCommentsByPostID(postID: string): Observable<BlogComment[]> {
    console.log('Getting comments for postID:', postID); // ✅ add this
    const commentRef = collection(this.firestore, 'comments');
    const q = query(commentRef, where('postID', '==', postID), orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<BlogComment[]>;
  }

  getReplies(parentId: string): Observable<BlogComment[]> {
    const commentRef = collection(this.firestore, 'comments');
    const q = query(
      commentRef,
      where('parentId', '==', parentId),
      orderBy('createdAt', 'asc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<BlogComment[]>;
  }

  deleteComment(commentId: string| undefined) {
    const commentRef = doc(this.firestore, `comments/${commentId}`);
    return deleteDoc(commentRef);
  }


  async deleteCommentWithReplies(commentId: string) {
    const repliesSnapshot = await getDocs(
      query(collection(this.firestore, 'comments'), where('parentId', '==', commentId))
    );
  
    // Recursively delete each reply and its own replies
    for (const docSnap of repliesSnapshot.docs) {
      await this.deleteCommentWithReplies(docSnap.id);
    }
  
    // Finally, delete the main comment
    await deleteDoc(doc(this.firestore, 'comments', commentId));
  }

  updateComment(commentId: string, newContent: string) {
    const commentRef = doc(this.firestore, `comments/${commentId}`);
    return updateDoc(commentRef, { content: newContent });
  }
}
