import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, observable, pipe } from 'rxjs';
import {
  catchError, map, mergeMap, tap, filter, take,
  concatMap, concat, scan, reduce, pairwise
} from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let myObservable1: Observable<string> = Observable.create(observer => {
      setTimeout(() => {
        observer.next('foo1');
        observer.next('foo2');
        observer.next('foo3');
        observer.next('foo4');
        observer.next('foo5');
        observer.next('foo6');
      }, 1000);
    });

    let myObservable2: Observable<string> = Observable.create(observer => {
      setTimeout(() => {
        observer.next('bar1');
        observer.next('bar2');
        observer.next('bar3');
        observer.next('bar4');
        observer.next('bar5');
        observer.next('bar6');
      }, 2000);
    });

    let myObservable3 = myObservable1.pipe(
      concat(myObservable2)
    );

    Observable.create(pipe)


    myObservable3.subscribe(value => {
      console.log("concat :" + value)
    });

    //filter and take
    myObservable1.pipe(
      filter(item => item.length == 4),
      take(2)
    ).subscribe(value => {
      console.log("filter and take :" + value)
    });

    //scan
    myObservable1.pipe(
      scan((a, item) => a += item, 'do')
    ).subscribe(o => console.log("scan:" + o));

    //reduce
    myObservable1.pipe(
      reduce((a, item) => a += item, 'do')
    ).subscribe(o => console.log("reduce:" + o));

    //pairwise
    myObservable1.pipe(
      pairwise()
    ).subscribe(o => console.log("pairwise:" + o));;


    myObservable1.pipe(
      map(n => {
        if (n == 'foo4') {
          throw 'four';
        }
        return n;
      })
    );

  }



}
