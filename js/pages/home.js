import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { dbService } from '../firebase.js';

// 브랜드 더보기
export const toggleMoreBrand = (event) => {
  event.preventDefault();
  const btnMoreBrand = document.querySelector('.btnMoreBrand');
  const AllBrandItems = document.querySelectorAll('.brandItem');

  if (btnMoreBrand.classList.contains('fa-chevron-down')) {
    AllBrandItems.forEach((item) => {
      if (item.classList.contains('hide')) {
        item.classList.toggle('hide');
      }
    });
  } else {
    AllBrandItems.forEach((item) => {
      if (!item.classList.contains('show')) {
        item.classList.toggle('hide');
      }
    });
  }

  btnMoreBrand.classList.toggle('fa-chevron-down');
  btnMoreBrand.classList.toggle('fa-chevron-up');
};

// 브랜드별 신발 리스트
export const changeShoesList = async (event) => {
  const currentTarget = Number(event.target.parentNode.parentNode.dataset.brand);

  let shoesObjList = [];

  const q = query(collection(dbService, 'shoesList'), where('brand', '==', currentTarget));
  const querySnapShot = await getDocs(q);

  querySnapShot.forEach((doc) => {
    const shoesObj = {
      id: doc.id,
      ...doc.data(),
    };
    shoesObjList.push(shoesObj);
  });

  const shoesList = document.querySelector('.shoesList');
  shoesList.innerHTML = '';

  console.log(shoesObjList.length);

  const temp = shoesObjList
    .map(
      (shoes, idx) =>
        `<li class="shoesItem ${idx >= 9 ? 'hide' : ''}">
        <a href="#" class="shoesLink">
        <div class="imgBox">
            <img
            src="${shoes.image}"
            alt="${shoes.shoesName}"
            />
        </div>
        <div class="infoBox">
            <p class="brandName">${shoes.brandName}</p>
            <p class="shoesName">${shoes.shoesName}</p>
        </div>
        </a>
    </li>`
    )
    .join('');

  shoesList.innerHTML = temp;
};
