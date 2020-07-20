import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../app.model'

@Injectable()

export class UserSharedService {

    constructor() { }

    private userArray = new BehaviorSubject<User[]>([
        {
            _id: '1',
            email: '123123@mail.ru',
            password: '123123',
            basket: ['101', '102']
        }, {
            _id: '2',
            email: '323123@mail.ru',
            password: '123456',
            basket: ['106', '104']
        }
    ]);
    usersShared$ = this.userArray.asObservable();

    addUser(obj: any): User {
        let newUser = {
            _id: `${Date.now()}`,
            email: obj.userRegEmail,
            password: obj.userRegPassword,
            basket: []
        }
        const currentValue = this.userArray.value;
        const updateValue = [...currentValue, newUser]
        this.userArray.next(updateValue)
        return newUser
    }

    addProduct(product_id: string, user_id: string): void {
        const newUserArray: User[] = this.userArray.getValue();
        const changedUserArray: User[] = newUserArray.map(
            (item: User) => {
                if (item._id === user_id) {
                    item.basket.push(product_id)
                }
                return item
            })
        this.userArray.next(changedUserArray)
    }

    delProduct(product_id: string, user_id: string): void {
        const newUserArray: User[] = this.userArray.getValue();
        const changedUserArray: User[] = newUserArray.map(
            (item: User) => {
                if (item._id === user_id) {
                    item.basket = item.basket.filter((id: string) => id !== product_id)
                }
                return item
            })
        this.userArray.next(changedUserArray)
    }

    minusProduct(product_id: string, user_id: string): void {
        const newUserArray: User[] = this.userArray.getValue();
        const changedUserArray: User[] = newUserArray.map(
            (item: User) => {
                if (item._id === user_id) {
                    let index = item.basket.indexOf(product_id)
                    if (index > -1) {
                        item.basket.splice(index, 1)
                    }
                }
                return item
            })
        this.userArray.next(changedUserArray)
    }

    clearProduct(user_id: string): void {
        const newUserArray: User[] = this.userArray.getValue();
        const changedUserArray: User[] = newUserArray.map(
            (item: User) => {
                if (item._id === user_id) {
                    item.basket = []
                }
                return item
            })
        this.userArray.next(changedUserArray)
    }


}