document.addEventListener('DOMContentLoaded', () => {
    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.getElementById('block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');
    const ordersTable = document.getElementById('orders');
    const modalOrder = document.getElementById('order_read');
    const modalOrderActive = document.getElementById('order_active');


    const orders = [];

    const renderOrders = () => {
        ordersTable.textContent = '';

        orders.forEach((order, i) => {
            console.log(order);
            ordersTable.innerHTML += `
    <tr class="order" data-number-order="${i}">
    <td>${i+1}</td>
    <td>${order.title}</td>
    <td class="${order.currency}"></td>
    <td>${order.deadline}</td>
    </tr>`;
        });

    }


    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder;

        const firstNameBlock = document.querySelector('.firstName');
        const titleBlock = document.querySelector('.modal-title');
        const emailBlock = document.querySelector('.email');
        const descriptionBlock = document.querySelector('.description');
        const currencyBlock = document.querySelector('.currency_img');
        const countBlock = document.querySelector('.count');
        const phoneBlock = document.querySelector('.phone');


        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
        descriptionBlock.textContent = order.description;
        currencyBlock.textContent = order.currency_img;
        countBlock.textContent = order.count;
        phoneBlock.textContent = order.phone;

        modal.style.display = 'block';
    };

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        console.log('target:', target);

        const targetOrder = target.closest('.order')
        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });


    freelancer.addEventListener('click', () => {
        blockFreelancer.style.display = 'block';
        renderOrders();
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockChoice.style.display = 'block';
    })

    formCustomer.addEventListener('submit', (e) => {
        e.preventDefault();

        const obj = {};

        const elements = [...formCustomer.elements]
            .filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) ||
                elem.tagName === "TEXTAREA");

        elements.forEach((elem) => {
            obj[elem.name] = elem.value;
            console.log(obj);
        });

        formCustomer.reset();

        orders.push(obj);
        console.log(orders);
    });


});