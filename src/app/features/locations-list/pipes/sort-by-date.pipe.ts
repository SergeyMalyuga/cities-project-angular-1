import {Pipe, PipeTransform} from '@angular/core';
import {Comment} from '../../../core/models/comments';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(comments: Comment[]) {
    return [...comments].sort(
      (a: Comment, b: Comment) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }
}
