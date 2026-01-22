const gamesData = [
    {
        id: 1,
        name: "Grand Theft Auto V",
        description: "لعبة أكشن مثيرة مليئة بالحركة والإثارة",
        type: "حرب",
        price: 199.99,
        rating: 5,
        image: "images/1.jpg"
    },
    {
        id: 2,
        name: "Resident Evil 4",
        description: "تجربة رعب مرعبة ستجعلك قلقاً طوال الوقت",
        type: "رعب",
        price: 149.99,
        rating: 4,
        image: "images/2.jpg"
    },
    {
        id: 3,
        name: "Fortnite",
        description: "استكشف القلاع والأسرار في عالم سحري",
        type: "مغامرات",
        price: 179.99,
        rating: 5,
        image: "images/3.jpg"
    },
    {
        id: 4,
        name: "FIFA 24",
        description: "أفضل محاكاة لكرة القدم مع أفضل الفرق",
        type: "رياضة",
        price: 249.99,
        rating: 4,
        image: "images/4.jpg"
    },
    {
        id: 5,
        name: "Marvel's Spider-Man",
        description: "اجمع أفضل السيارات واختر مسارات صعبة",
        type: "سباق",
        price: 159.99,
        rating: 5,
        image: "images/5.jpg"
    },
    {
        id: 6,
        name: "Uncharted 4",
        description: "ابحث عن الكنوز المخفية في جزر غامضة",
        type: "مغامرات",
        price: 129.99,
        rating: 4,
        image: "images/6.jpg"
    },
    {
        id: 7,
        name: "UFC 5",
        description: "اصبح بطل العالم في الملاكمة",
        type: "رياضة",
        price: 139.99,
        rating: 3,
        image: "images/7.jpg"
    },
    {
        id: 8,
        name: "The Last of Us Part II",
        description: "استكشف الكون واجه الكائنات الفضائية",
        type: "خيال علمي",
        price: 219.99,
        rating: 5,
        image: "images/8.jpg"
    },
    {
        id: 9,
        name: "God of War",
        description: "حارب الأعداء بأسلحة قديمة وسحرية",
        type: "حرب",
        price: 169.99,
        rating: 4,
        image: "images/9.jpg"
    },
    {
        id: 10,
        name: "Bloodborne",
        description: "شارك في بطولة كأس العالم وفز باللقب",
        type: "رياضة",
        price: 229.99,
        rating: 5,
        image: "images/10.jpg"
    }
];

let currentSlide = 0;

function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || slides.length === 0) return;
    
    function showSlide(n) {
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
    }
    
    const prevBtn = document.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
    
    showSlide(0);
}

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                localStorage.setItem('username', username);
                window.location.href = 'index.html';
            } else {
                alert('يرجى إدخال اسم المستخدم وكلمة المرور');
            }
        });
    }
}

function displayTopGames() {
    const topGamesContainer = document.getElementById('topGames');
    if (!topGamesContainer) return;
    
    const topGames = [...gamesData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    
    topGamesContainer.innerHTML = topGames.map(game => `
        <div class="game-card">
            <img src="${game.image}" alt="${game.name}" onerror="this.src='images/placeholder.jpg'">
            <h3>${game.name}</h3>
            <div class="rating">${'⭐'.repeat(game.rating)}</div>
        </div>
    `).join('');
}

function displayAllGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    if (!gamesContainer) return;
    
    gamesContainer.innerHTML = gamesData.map(game => `
        <div class="game-item">
            <img src="${game.image}" alt="${game.name}" onerror="this.src='images/placeholder.jpg'">
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <span class="game-type">${game.type}</span>
                <div class="game-price">${game.price} ر.ي</div>
                <button class="add-to-cart-btn" onclick="addToCart(${game.id})">
                    إضافة إلى العربة
                </button>
            </div>
        </div>
    `).join('');
}

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;
    
    const cart = getCart();
    
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        alert('اللعبة موجودة بالفعل في العربة');
    } else {
        cart.push({
            id: game.id,
            name: game.name,
            price: game.price,
            image: game.image
        });
        saveCart(cart);
        alert('تم إضافة اللعبة إلى العربة بنجاح!');
    }
}

function removeFromCart(gameId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== gameId);
    saveCart(updatedCart);
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (!cartContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">العربة فارغة</div>';
        if (totalPriceElement) totalPriceElement.textContent = '0.00 ر.ي';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-price">${item.price} ر.ي</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                حذف
            </button>
        </div>
    `).join('');
    
    if (totalPriceElement) {
        totalPriceElement.textContent = total.toFixed(2) + ' ر.ي';
    }
}

function checkout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert('العربة فارغة');
        return;
    }
    
    localStorage.removeItem('cart');
    
    const cartContainer = document.getElementById('cartItems');
    if (cartContainer) {
        cartContainer.innerHTML = `
            <div class="alert alert-success">
                <h3>تم تأكيد الشراء بنجاح! 🎉</h3>
                <p>شكراً لشرائك من متجرنا. سيتم التواصل معك قريباً.</p>
            </div>
        `;
    }
    
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = '0.00 ر.ي';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initLogin();
    displayTopGames();
    displayAllGames();
    displayCart();
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});