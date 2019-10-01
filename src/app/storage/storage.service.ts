import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = [];

  constructor() { }

  setLocal(key, value: any) {

  }

  getLocal(key) {
    return key;
  }
}
