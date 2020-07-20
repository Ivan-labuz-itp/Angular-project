import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../app.model'

@Injectable()

export class ProductSharedService {

    private productArray = new BehaviorSubject<Product[]>([
        {
            _id: '100',
            url: 'https://i.pinimg.com/originals/6d/e4/67/6de4673e16f515105a4e7e743600e5a4.jpg',
            name: 'Bouquet 100',
            text: 'Beautiful bouquet',
            price: 100
        }, {
            _id: '101',
            url: 'https://s42.radikal.ru/i095/1210/70/70dac3f970ec.jpg',
            name: 'Bouquet 101',
            text: 'Beautiful bouquet',
            price: 101
        }, {
            _id: '102',
            url: 'https://cloudstatic.eva.ru/eva/120000-130000/128142/photoalbum/43480866351342250.jpg',
            name: 'Bouquet 102',
            text: 'Beautiful bouquet',
            price: 102
        }, {
            _id: '103',
            url: 'https://wpten.ru/category/citaty-i-mysli/p/560895/gallery/preview.jpg?url=nezhnij-buket-krasivejshih-pionov-a-vi-lyubite-pioni',
            name: 'Bouquet 103',
            text: 'Beautiful bouquet',
            price: 104
        },
        {
            _id: '104',
            url: 'https://s42.radikal.ru/i095/1210/70/70dac3f970ec.jpg',
            name: 'Bouquet 104',
            text: 'Beautiful bouquet',
            price: 104
        }, {
            _id: '105',
            url: 'https://u20.plpstatic.ru/dcaa49dde3f2fa551b8a9295a10309fc/1693c989e7c91a3f7d72730225ae02bc.jpg',
            name: 'Bouquet 105',
            text: 'Beautiful bouquet',
            price: 105
        }, {
            _id: '106',
            url: 'https://kaznmu.kz/rus/wp-content/uploads/2011/12/url1-1024x819.jpeg',
            name: 'Bouquet 106',
            text: 'Beautiful bouquet',
            price: 106
        }, {
            _id: '107',
            url: 'https://i.pinimg.com/474x/fe/c4/ef/fec4efe31c902c02744378c648d23be2.jpg',
            name: 'Bouquet 107',
            text: 'Beautiful bouquet',
            price: 107
        }, {
            _id: '108',
            url: 'https://img.anews.com/?w=850&url=https://img.anews.com/media/posts/images/20151119/34867623.jpg',
            name: 'Bouquet 108',
            text: 'Beautiful bouquet',
            price: 108
        }, {
            _id: '109',
            url: 'https://cvetochka.com/upload/iblock/a71/a7119ec66086e1a03d513151b5851c3e.jpg',
            name: 'Bouquet 109',
            text: 'Beautiful bouquet',
            price: 109
        },
    ]);
    productsShared$ = this.productArray.asObservable();

    addProduct(obj): void {
        let newProduct
        if (obj.text) {
            newProduct = {
                _id: `${Date.now()}`,
                name: obj.name,
                url: obj.url,
                price: obj.price,
                text: obj.text
            }
        } else {
            newProduct = {
                _id: `${Date.now()}`,
                name: obj.name,
                url: obj.url,
                price: obj.price
            }

        }
        const currentValue: Product[] = this.productArray.value;
        const updateValue: Product[] = [...currentValue, newProduct]
        this.productArray.next(updateValue)
    }

    constructor() { }

}