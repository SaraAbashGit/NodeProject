document.getElementById('looking-for').addEventListener('change', function() {
    var selectedOption = this.options[this.selectedIndex]; 
    var selectedText = selectedOption.text; 
    console.log(selectedText); 
});




const productsPerPage = 4;
const products = [
  {
    title: 'Chef Kitchen',
    image: 'images/shop/kitchen_begge.jpg',
    price: '$6,500',
    productsId:"1234",
    _id:"6834b9f572c14b1b58322a12"
  },
  {
    title: 'Dining',
    image: 'images/shop/mock-up-poster-modern-dining-room-interior-design-with-white-empty-wall.jpg',
    price: '$4,800',
    productsId:"2256",
    _id:"6834ba3372c14b1b58322a14"
  },
  {
    title: 'Living Room',
    image: 'images/shop/green-sofa-white-living-room-with-blank-table-mockup.jpg',
    price: '$2,400',
    productsId:"1792",
    _id:"6834ba6172c14b1b58322a16"
  },

    {
    title: 'Bathroom',
    image: 'images/shop/bathroom1.jpg',
    price: '$8,200',
    productsId:"9012",
    _id:"6834ce547205c3c3650b6b66"
  },
  {
    title: 'Full Kitchen',
    image: 'images/shop/kitchen2.jpg', // תיקון: הוספתי סיומת .jpg
    price: '$5,100',
    productsId:"3658",
    _id:"6834d57b7205c3c3650b6b73"
  },
    {
    title: 'Kids Room',
    image: 'images/shop/children1.jpg',
    price: '$3,200',
    productsId:"2569",
    _id: "6834d6f7daa826302daa85a0"
  },
  {
    title: 'Modern Bedroom',
    image: 'images/shop/bedroom4.jpg',
    price: '$7,000',
    productsId:"1568",
     _id: "6834d732daa826302daa85a2"
  },

  {
    title: 'Design Bathroom',
    image: 'images/shop/bathroom5.jpg',
    price: '$2,900',
    productsId:"1741",
    _id: "6834d7efdaa826302daa85a4",
  },
  
  {
    title: 'Modern Bedroom',
    image: 'images/shop/bedroom3.jpg',
    price: '$7,000',
    productsId:"0321",
    _id: "6834d88ddaa826302daa85aa",
  },
  {
    title: 'Modern Bathroom',
    image: 'images/shop/bathroom2.jpg',
    price: '$3,200',
    productsId:"1566",
    _id: "6834d850daa826302daa85a8"
  },
  {
    title: 'Living Room',
    image: 'images/shop/livingroom2.jpg',
    price: '$2,900',
    productsId:"8520",
    _id: "6834d8d1daa826302daa85ac",
  },
  {
    title: 'Living Room',
    image: 'images/shop/livingroom3.jpg',
    price: '$5,100',
    productsId:"6954",
    _id: "6834d8f6daa826302daa85ae",
  },
  {
    title: 'Bedroom',
    image: 'images/shop/bedroom2.jpg',
    price: '$7,000',
    productsId:"3654",
     _id: "6834d92cdaa826302daa85b0",
  },
  {
    title: 'Modern Bathroom',
    image: 'images/shop/bathroom8.jpg',
    price: '$3,200',
    productsId:"2565",
    _id: "6834d950daa826302daa85b2",
  },
  {
    title: 'Living Room',
    image: 'images/shop/livingroom5.jpg',
    price: '$2,900',
    productsId:"0456",
      _id: "6834d989daa826302daa85b4",
  },
  {
    title: 'parents bedroom',
    image: 'images/shop/bedroom8.jpg',
    price: '$5,100',
    productsId:"3694",
    _id: "6834d9bfdaa826302daa85b6",
  },
  {
    title: 'Children Bedroom',
    image: 'images/shop/children2.jpg',
    price: '$7,000',
    productsId:"0008",
    _id: "6834d9fcdaa826302daa85b8",
  },
  {
    title: 'Modern Bathroom',
    image: 'images/shop/bathroom9.jpg',
    price: '$3,200',
    productsId:"0909",
    _id: "6840a99d90ec28dbb82da4f7",
  },
  {
    title: 'Kitchen',
    image: 'images/shop/kitchen5.jpg',
    price: '$2,900',
    productsId:"1366",
     _id: "6840acd190ec28dbb82da4f9",
  },
  {
    title: 'parents bedroom',
    image: 'images/shop/bedroom6.jpg',
    price: '$5,100',
    productsId:"1111",
    _id: "6840ad8a90ec28dbb82da4fb",
  },
  {
        title: 'Sea bedroom',
        image: 'images/children/myChildren15.png',
        price: '$2,900',
        productsId:"1310"
      },
      {
        title: 'colorful bedroom',
        image: 'images/children/myChildren12.png',
        price: '$5,100',
        productsId:"2478"
      },
       {
        title: 'Dining room',
        image: 'images/shop/diningroom2.jpg',
        price: '$2,900',
        productsId:"9478"
      },
       {
        title: 'Kitchen',
        image: 'images/shop/kitchen3.jpg',
        price: '$2,400',
        productsId:"9470"
      },
          {
        title: 'designed bathroom',
        image: 'images/shop/bathroom10.jpg',
        price: '$3,300',
        productsId:"1023"
      },
     
      {
        title: 'pastel bedroom',
        image: 'images/children/myChildren10.png',
        price: '$2,100',
        productsId:"2411"
      },
      {
        title: 'well bathroom',
        image: 'images/shop/bathroom6.jpg',
        price: '$3,100',
        productsId:"2433"
      },
     {
        title: 'music Bedroom',
        image: 'images/children/myChildren7.png',
        price: '$3,100',
        productsId:"2472"
      }
    
];



// משתני עזר
let currentPage = 1;
const totalPages = Math.ceil(products.length / productsPerPage);

// מעקב אחרי המוצרים שנוספו לסל
const cartItems = {}; // key: productId, value: count
let totalPrice = 0;
let amount = 0;

// פונקציה להצגת מוצרים בדף
function renderProducts(page) {
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = products.slice(start, end);

  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = ''; // מנקה את המוצרים הקודמים

  pageProducts.forEach(product => {
    // נבצע הסרת $ מהמחיר
    const priceNumber = parseFloat(product.price.replace('$', '').replace(',', ''));

    // בדיקה האם המוצר כבר בסל – לסמן את האיקון במידת הצורך
    const isChecked = cartItems[product.productsId] ? 'checked-cart' : '';

    const col = document.createElement('div');
    col.className = 'col-lg-6 col-12';
    col.innerHTML = `
      <div class="shop-thumb">
        <div class="shop-image-wrap">
          <a href="shop-detail.html">
            <img src="${product.image}" class="shop-image img-fluid" alt="${product.title}">
          </a>
          <div class="shop-icons-wrap">
            <div class="shop-icons d-flex flex-column align-items-center">
              <a href="#" class="shop-icon bi-heart" data-bs-toggle="button" aria-pressed="false"></a>
              <a href="#" 
                 class="add-to-cart-icon bi bi-cart-plus ${isChecked}" 
                 data-product-id="${product.productsId}" 
                 data-product-price="${priceNumber}" 
                 style="cursor: pointer;">
              </a>
            </div>
            <p class="shop-pricing mb-0 mt-3">
              <span class="badge custom-badge">${product.price}</span>
            </p>
          </div>
          <div class="shop-btn-wrap">
            <a href="shop-detail.html" class="shop-btn custom-btn btn d-flex align-items-center">Learn more</a>
          </div>
        </div>
        <div class="shop-body">
          <h4>${product.title}</h4>
        </div>
      </div>`;
    productsContainer.appendChild(col);
  });

  // הוספת מאזינים לאיקוני עגלת הקניות בדף (אחרי יצירת האלמנטים!)
  document.querySelectorAll('.add-to-cart-icon').forEach(icon => {
    icon.addEventListener('click', toggleCart);
  });

  updatePagination(page); // הצגת פאגינציה
  updateCartSummary(); // לעדכן סכום וכמות
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Optional: prevent duplicates by checking ID
  if (!cart.find(p => p.id === item.id)) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item.title + ' נוסף לעגלה!');
  } else {
    alert(item.title + ' כבר בעגלה!');
  }
}
// פונקציה להוספה/הסרה מהסל
function toggleCart(event) {
  event.preventDefault();
  const icon = event.currentTarget;
  const productId = icon.getAttribute('data-product-id');
  const price = Number(icon.getAttribute('data-product-price'));

  // אם המוצר כבר בסל – נוציא אותו, אחרת נוסיף
  if (cartItems[productId]) {
    // הסרה
    delete cartItems[productId];
  } else {
    // הוספה
    cartItems[productId] = true;
  }
  updateCartSummary();
updateSelectedProductIds(); // ← להוסיף מיד פה!

  // כדי לצבוע/להוריד צבע מהאיקון הנוכחי (ולאחרים בעמודים אחרים בעת מעבר עמודים)
  icon.classList.toggle('checked-cart');

  // אם תרצה להבטיח שכל האיקונים של אותו מוצר יצבעו/יתעדכנו גם בדפים אחרים, תוכל לעבור על כולם:
  document.querySelectorAll(`.add-to-cart-icon[data-product-id="${productId}"]`).forEach(elem => {
    if (cartItems[productId]) {
      elem.classList.add('checked-cart');
    } else {
      elem.classList.remove('checked-cart');
    }
  });
}

// פונקציה לעדכון סכום/כמות בטופס
function updateCartSummary() {
  // חישוב מחדש!
  let sum = 0;
  let count = 0;
  for (let id in cartItems) {
    let product = products.find(p => p.productsId === id);
    if (product) {
      count += 1;
      sum += parseFloat(product.price.replace('$', '').replace(',', ''));
    }
  }
  // עדכון בממשק
  document.getElementById('amount1').innerHTML = count;
  document.getElementById('price').innerHTML = '$' + sum.toLocaleString();
}

// פאגינציה
function updatePagination(activePage) {
  const paginationUl = document.querySelector('.pagination');
  paginationUl.innerHTML = '';

  // previous
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${activePage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `<a class="page-link" href="#">&laquo;</a>`;
  prevLi.onclick = (e) => {
    e.preventDefault();
    if (activePage > 1) {
      currentPage--;
      renderProducts(currentPage);
    }
  };
  paginationUl.appendChild(prevLi);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === activePage ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = (e) => {
      e.preventDefault();
      currentPage = i;
      renderProducts(currentPage);
    };
    paginationUl.appendChild(li);
  }

  // next
  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${activePage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `<a class="page-link" href="#">&raquo;</a>`;
  nextLi.onclick = (e) => {
    e.preventDefault();
    if (activePage < totalPages) {
      currentPage++;
      renderProducts(currentPage);
    }
  };
  paginationUl.appendChild(nextLi);
}
document.addEventListener('DOMContentLoaded', function() {
  renderProducts(currentPage);
  document.getElementById('amount1').innerHTML = 0;
  document.getElementById('price').innerHTML = '$0';
  
  updateSelectedProductIds(); // יאפסת רשימת המוצרים
});

// הפעלת הטעינה הראשונית:
document.addEventListener('DOMContentLoaded', function() {
  renderProducts(currentPage);
  // אפס את הכמות/סכום בטופס
  document.getElementById('amount1').innerHTML = 0;
  document.getElementById('price').innerHTML = '$0';
});
// פונקציה זו לא מראה את שם
// function updateSelectedProductIds() {
//     const ul = document.getElementById('selected-product-ids');
//     ul.innerHTML = ""; // נקה את הרשימה קודם

//     // עברי על אובייקט הסל והוסיפי כל קוד מוצר לרשימה
//     Object.keys(cartItems).forEach(productId => {
//         const li = document.createElement('li');
//         li.textContent = productId;
//         ul.appendChild(li);
//     });
// }

// פונקציה זו מראה את קוד המוצר עם שם:
function updateSelectedProductIds() {
    const ul = document.getElementById('selected-product-ids');
    ul.innerHTML = "";
    Object.keys(cartItems).forEach(productId => {
        const product = products.find(p => p.productsId === productId);
        const li = document.createElement('li');
        li.textContent = product ? `${productId} - ${product.title}` : productId;
        ul.appendChild(li);
    });
}
// ... כל הקוד שלך למעלה ...

document.getElementById('orderBtn').addEventListener('click', function(e) {
      e.preventDefault(); // הוסיפי שורה זו

    // בונים מערך של המוצרים שנבחרו לסל
    const selectedProducts = Object.keys(cartItems).map(productId =>
        products.find(p => p.productsId === productId)
    ).filter(Boolean);

    // סכום כולל
    const sum = selectedProducts.reduce((acc, p) => 
        acc + parseFloat(p.price.replace('$','').replace(',','')), 0);

    // שמירה ל-localStorage
    localStorage.setItem('cartItems', JSON.stringify(selectedProducts));
    localStorage.setItem('cartSum', sum);

    // מעבר לעמוד הסל
    window.location.href = 'shopping-cart.html';
});

