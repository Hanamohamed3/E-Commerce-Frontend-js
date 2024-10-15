let allData = [];

async function getData() {
    document.querySelector("#myData").innerHTML = ` <div class="loader-container">
    <div class="loader"></div>
</div>
`;

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data);
        allData = data;
        display();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();


function display() {
    let cartona = ``;
    for (let i = 0; i < allData.length; i++) {
        cartona += `
  <div class="card m-4 text-dark " style="width: 18rem; background-color:white" onclick="getId('${allData[i].id}')">

            <img src="${allData[i].image}" class="card-img-top mt-2" alt="...">
            <div class="card-body ">
                <div class="titles d-flex justify-content-between">
                    <h5 class="card-title">${allData[i].title}</h5>
                </div>

                <div class="titles d-flex justify-content-between">

                    <button type="button" class="btn  btn-sm"> ${allData[i].price}LE</button>

                <p class="card-text"> <i class="fa-solid fa-star" style="color: #FFD43B;"></i></i>${allData[i].rating.rate}</p>
            </div>
            </div>
        </div>`;
    }

    document.querySelector("#myData").innerHTML = cartona;
}




function removeActiveClass() {
    const navLinks = document.querySelectorAll('.navbar-nav .active');
    navLinks.forEach(link => link.classList.remove('active'));
}



document.querySelector('#Home').addEventListener('click', function (event) {
    event.preventDefault();
    removeActiveClass();
    this.classList.add('active');
    getData('Home');
});



document.querySelector('#About').addEventListener('click', function (event) {
    event.preventDefault();
    removeActiveClass();
    this.classList.add('active');
    getData('About');
});

document.querySelector('#Shop').addEventListener('click', function (event) {
    event.preventDefault();

    removeActiveClass();
    this.classList.add('active');

    getData('Shop');
});



document.querySelector('#ContactUs').addEventListener('click', function (event) {
    event.preventDefault();

    removeActiveClass();
    this.classList.add('active');

    getData('ContactUs');
});



function getId(myId) {
    console.log(myId);
    getProductDetails(myId);
}

async function getProductDetails(id) {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        let product = await response.json();
        console.log(product);
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function displayProductDetails(product) {
    document.querySelector("#Bar").classList.add("d-none");
    document.querySelector("#Footer").classList.add("d-none");

    document.querySelector("#second").classList.remove("first");

    let cartona = `
        <div class="container">
            <div class="product-container">
                <div class="d-flex justify-content-between mt-3" id="lightBoxContainer">
                    <h2 class="mb-4">Product Details</h2>
                    <i class="fa-solid fa-xmark fs-3" id="closeBtn"></i>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <img src="${product.image}" alt="${product.title}" class="img-fluid">
                    </div>
                    <div class="col-md-9">
                        <h2> ${product.title}</h2>
                        <h4>
                            <p
                            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                            ${product.category}
                        </p>
                        </h4>
                        <p class="mb-4">${product.description}</p>
                        <h4>
                            ${product.price}LE
                        </h4>
                        </h4>
                        
                        <br/>
                        <a class="btn btn-outline-white show-product" id="product" href="#" target="_blank">Buy Now</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector("#myData").innerHTML = cartona;

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', () => {
        closeDetailsContainer();
    });
}

function closeDetailsContainer() {
    window.location.href = 'index.html';
}

