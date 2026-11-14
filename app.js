const WHATSAPP_NUMBER = ""; // Informe o número com DDI e DDD, somente números. Ex.: 5541999999999
const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const products = [
 {id:1,name:"Margherita",category:"Clássicas",description:"Molho artesanal, mozzarella, tomate fresco e manjericão.",price:42,image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",tag:"A QUERIDINHA"},
 {id:2,name:"Pepperoni",category:"Clássicas",description:"Mozzarella cremosa, pepperoni especial e toque de orégano.",price:49,image:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",tag:"MAIS PEDIDA"},
 {id:3,name:"Quatro Queijos",category:"Especiais",description:"Mozzarella, gorgonzola, parmesão e catupiry original.",price:52,image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",tag:"CREMOSA"},
 {id:4,name:"Calabresa da Casa",category:"Clássicas",description:"Calabresa artesanal, cebola roxa, mozzarella e azeitonas.",price:45,image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80",tag:"CLÁSSICA"},
 {id:5,name:"Caprese",category:"Vegetarianas",description:"Tomate-cereja, mozzarella, pesto fresco e folhas de manjericão.",price:48,image:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",tag:"FRESQUINHA"},
 {id:6,name:"Chocolate & Morango",category:"Doces",description:"Chocolate cremoso, morangos frescos e açúcar de confeiteiro.",price:46,image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",tag:"DOCE MOMENTO"}
];
let category = "Todas";
let cart = [];
const grid = document.querySelector("#product-grid");
function renderProducts(){
 const term = document.querySelector("#search").value.trim().toLocaleLowerCase("pt-BR");
 const filtered = products.filter(p=>(category==="Todas"||p.category===category)&&(`${p.name} ${p.description}`.toLocaleLowerCase("pt-BR").includes(term)));
 grid.innerHTML = filtered.length ? filtered.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="Pizza ${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></div><div class="product-info"><span class="product-meta">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Adicionar ${p.name} ao carrinho">+</button></div></div></article>`).join("") : '<p class="empty-cart">Não encontramos essa pizza. Tente outra busca.</p>';
}
function renderCart(){
 document.querySelector("#cart-count").textContent=cart.reduce((sum,item)=>sum+item.quantity,0);
 document.querySelector("#cart-total").textContent=money(cart.reduce((sum,item)=>sum+item.price*item.quantity,0));
 document.querySelector("#cart-items").innerHTML=cart.length?cart.map(item=>`<div class="cart-row"><div><strong>${item.name}</strong><small>${money(item.price)} cada</small></div><div class="quantity"><button data-qty="${item.id}" data-delta="-1" aria-label="Diminuir">−</button><b>${item.quantity}</b><button data-qty="${item.id}" data-delta="1" aria-label="Aumentar">+</button></div></div>`).join(""):'<p class="empty-cart">Sua sacola ainda está vazia.<br>Que tal escolher uma pizza deliciosa?</p>';
}
grid.addEventListener("click",event=>{const button=event.target.closest("[data-add]");if(!button)return;const product=products.find(p=>p.id===Number(button.dataset.add));const found=cart.find(item=>item.id===product.id);found?found.quantity++:cart.push({...product,quantity:1});renderCart();button.textContent="✓";setTimeout(()=>button.textContent="+",650)});
document.querySelector("#categories").addEventListener("click",event=>{const button=event.target.closest("[data-category]");if(!button)return;category=button.dataset.category;document.querySelectorAll(".category").forEach(el=>el.classList.toggle("active",el===button));renderProducts()});
document.querySelector("#search").addEventListener("input",renderProducts);
document.querySelector("#cart-items").addEventListener("click",event=>{const button=event.target.closest("[data-qty]");if(!button)return;const item=cart.find(p=>p.id===Number(button.dataset.qty));item.quantity+=Number(button.dataset.delta);if(item.quantity<=0)cart=cart.filter(p=>p.id!==item.id);renderCart()});
const overlay=document.querySelector("#cart-overlay");
document.querySelector("#open-cart").addEventListener("click",()=>{overlay.hidden=false;document.body.style.overflow="hidden"});
function closeCart(){overlay.hidden=true;document.body.style.overflow=""}
document.querySelector("#close-cart").addEventListener("click",closeCart);
overlay.addEventListener("click",event=>{if(event.target===overlay)closeCart()});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!overlay.hidden)closeCart()});
document.querySelector("#checkout").addEventListener("click",()=>{
 if(!cart.length){alert("Adicione pelo menos uma pizza à sua sacola.");return}
 const name=document.querySelector("#customer-name").value.trim();
 const address=document.querySelector("#customer-address").value.trim();
 if(!name||!address){alert("Informe seu nome e endereço para continuar.");return}
 if(!/^\d{12,13}$/.test(WHATSAPP_NUMBER)){alert("A pizzaria ainda precisa configurar o número de WhatsApp no arquivo app.js.");return}
 const lines=cart.map(item=>`• ${item.quantity}x ${item.name} — ${money(item.price*item.quantity)}`).join("\n");
 const total=money(cart.reduce((sum,item)=>sum+item.price*item.quantity,0));
 const message=`Olá! Quero fazer um pedido na Forno & Brasa.\n\nNome: ${name}\nEndereço: ${address}\n\nPedido:\n${lines}\n\nTotal dos produtos: ${total}\n\nPor favor, confirme disponibilidade, taxa de entrega e formas de pagamento.`;
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
document.querySelector("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();