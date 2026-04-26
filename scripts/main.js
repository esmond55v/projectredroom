// ─ CART ─
var cart = [
  { id:1, name:'Design 01', sub:'Oversized Square', price:79 },
  { id:2, name:'The REDROOM Set', sub:'Sunnies + Pouch + Box', price:199 }
];

function renderCart() {
  var list = document.getElementById('clist');
  var footer = document.getElementById('cfooter');
  var tit = document.getElementById('ctit');
  var sub = document.getElementById('csub');
  var badge = document.getElementById('cbd');
  if (!list) return;
  var n = cart.length;
  tit.textContent = n > 0 ? 'YOUR CART (' + n + ')' : 'YOUR CART';
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
  if (n === 0) {
    var e = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:256px;gap:13px">';
    e += '<div style="font-size:28px;color:var(--s1)">&#x25FB;</div>';
    e += '<div style="font-family:Oswald;font-size:13px;letter-spacing:3px;color:var(--f);text-transform:uppercase">Your cart is empty</div>';
    e += '<button class="bo" onclick="shopClose()" style="font-size:9.5px;padding:9px 20px">SHOP NOW</button>';
    e += '</div>';
    list.innerHTML = e;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  var total = 0;
  for (var i = 0; i < cart.length; i++) total += cart[i].price;
  sub.textContent = 'S$' + total;
  var html = '';
  for (var j = 0; j < cart.length; j++) {
    var it = cart[j];
    html += '<div class="ci" id="ci' + it.id + '">';
    html += '<div class="cimg" style="font-family:Inter;font-size:8px;letter-spacing:1px;color:var(--s3);text-align:center">' + it.name.split(' ').slice(0,2).join(' ') + '</div>';
    html += '<div class="cinfo"><div class="cname">' + it.name + '</div>';
    html += '<div class="csub">' + it.sub + '</div>';
    html += '<div class="cprice">S$' + it.price + '</div></div>';
    html += '<button class="crm" onclick="rmCart(' + it.id + ')">&#x2715;</button>';
    html += '</div>';
  }
  list.innerHTML = html;
  renderCO();
}

function renderCO() {
  var ci = document.getElementById('coitems');
  var cs = document.getElementById('cosub');
  var ct = document.getElementById('cotot');
  if (!ci) return;
  var h = ''; var tot = 0;
  for (var i = 0; i < cart.length; i++) {
    var it = cart[i]; tot += it.price;
    h += '<div style="display:flex;justify-content:space-between;margin-bottom:9px">';
    h += '<div><div style="font-size:11.5px;font-weight:500;color:var(--c)">' + it.name + '</div>';
    h += '<div style="font-size:10.5px;color:var(--f)">' + it.sub + '</div></div>';
    h += '<div style="font-size:11.5px;color:var(--c)">S$' + it.price + '</div></div>';
  }
  ci.innerHTML = h;
  if (cs) cs.textContent = 'S$' + tot;
  if (ct) ct.textContent = 'S$' + tot;
}

function rmCart(id) {
  var el = document.getElementById('ci' + id);
  if (el) { el.style.opacity = '0'; el.style.transition = 'opacity .18s'; }
  setTimeout(function() {
    cart = cart.filter(function(i) { return i.id !== id; });
    renderCart();
  }, 200);
  toast('Item removed');
}

function addToCart(id, name, sub, price) {
  var found = false;
  for (var i = 0; i < cart.length; i++) { if (cart[i].id === id) { found = true; break; } }
  if (!found) cart.push({ id:id, name:name, sub:sub, price:price });
  renderCart();
  toast('Added to cart');
  openCart();
}

function shopClose() { goTo('shop'); closeCart(); }

// ─ NAV ─
function goTo(page) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var el = document.getElementById('page-' + page);
  if (el) { el.classList.add('active'); window.scrollTo(0, 0); }
  document.querySelectorAll('.nl').forEach(function(l) { l.classList.remove('on'); });
  var m = { shop:'ns', collections:'nc', about:'na', faq:'nf' };
  if (m[page]) { var n = document.getElementById(m[page]); if (n) n.classList.add('on'); }
  if (page.indexOf('product') === 0) { var ns = document.getElementById('ns'); if (ns) ns.classList.add('on'); }
  closeAll();
  if (page === 'checkout') renderCO();
}

// ─ DRAWERS / OVERLAYS ─
function openCart() { document.getElementById('cart').classList.add('on'); document.getElementById('ov').classList.add('on'); }
function closeCart() { document.getElementById('cart').classList.remove('on'); document.getElementById('ov').classList.remove('on'); }
function openLdr() { document.getElementById('ldr').classList.add('on'); document.getElementById('ov').classList.add('on'); }
function closeLdr() { document.getElementById('ldr').classList.remove('on'); document.getElementById('ov').classList.remove('on'); }
function closeAll() { closeCart(); closeLdr(); document.getElementById('ov').classList.remove('on'); }
function closeEP() {
  document.getElementById('ep').classList.remove('on');
  document.getElementById('pov').classList.remove('on');
  document.getElementById('pov2').classList.remove('on');
}
function openSrch() { document.getElementById('srch').classList.add('on'); document.getElementById('sri').focus(); }
function closeSrch() { document.getElementById('srch').classList.remove('on'); }
function openSG() { document.getElementById('mbox').classList.add('on'); document.getElementById('movl').classList.add('on'); }
function closeSG() { document.getElementById('mbox').classList.remove('on'); document.getElementById('movl').classList.remove('on'); }

// ─ LOGIN TABS ─
function swTab(tid, fid) {
  ['t1','t2'].forEach(function(t) { document.getElementById(t).classList.remove('on'); });
  ['f1','f2'].forEach(function(f) { document.getElementById(f).style.display = 'none'; });
  document.getElementById(tid).classList.add('on');
  document.getElementById(fid).style.display = 'block';
}

// ─ SHOP FILTER ─
function setFilter(btn, cat) {
  document.querySelectorAll('.fbtn').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  document.querySelectorAll('.pc').forEach(function(c) {
    c.style.display = (cat === 'all' || (c.dataset.cat && c.dataset.cat.includes(cat))) ? '' : 'none';
  });
}

// ─ CAROUSEL ─
var si = 0; var sc = 4;
function goSlide(n) {
  si = n;
  document.getElementById('ctr').style.transform = 'translateX(-' + n * 100 + '%)';
  document.querySelectorAll('.cdot').forEach(function(d, i) { d.classList.toggle('on', i === n); });
}
function nextSlide() { goSlide((si + 1) % sc); }
function prevSlide() { goSlide((si - 1 + sc) % sc); }
var auto = setInterval(nextSlide, 5500);
var hero = document.getElementById('hero');
hero.addEventListener('mouseenter', function() { clearInterval(auto); });
hero.addEventListener('mouseleave', function() { auto = setInterval(nextSlide, 5500); });

// ─ STRIP SCROLL ─
var stripI = 0;
function scrollStrip(n) {
  stripI = n;
  document.getElementById('ctr2').style.transform = 'translateX(-' + n * 882 + 'px)';
  document.querySelectorAll('.sd').forEach(function(d, i) { d.classList.toggle('on', i === n); });
}

// ─ FAQ ─
function showFaq(s) {
  document.querySelectorAll('.fsec').forEach(function(x) { x.classList.remove('on'); });
  document.querySelectorAll('.fsi').forEach(function(x) { x.classList.remove('on'); });
  var el = document.getElementById('faq-' + s);
  if (el) el.classList.add('on');
  var order = ['returns','payment','product','account'];
  var idx = order.indexOf(s);
  var items = document.querySelectorAll('.fsi');
  if (idx >= 0 && items[idx]) items[idx].classList.add('on');
}
function toggleFaq(q) {
  var a = q.nextElementSibling;
  var wasOpen = a.classList.contains('on');
  q.closest('.fsec').querySelectorAll('.fa').forEach(function(x) { x.classList.remove('on'); });
  q.closest('.fsec').querySelectorAll('.fq').forEach(function(x) { x.classList.remove('on'); });
  if (!wasOpen) { a.classList.add('on'); q.classList.add('on'); }
}

// ─ NEWSLETTER ─
function nlSub() {
  var v = document.getElementById('nli').value;
  if (v.indexOf('@') > -1) { toast('You\'re on the list.'); document.getElementById('nli').value = ''; }
  else toast('Please enter a valid email');
}

// ─ TOAST ─
function toast(msg) {
  var t = document.getElementById('tst');
  t.textContent = msg;
  t.classList.add('on');
  setTimeout(function() { t.classList.remove('on'); }, 2600);
}

// ─ GALLERY THUMBS ─
document.querySelectorAll('.gt').forEach(function(g) {
  g.addEventListener('click', function() {
    this.closest('.gts').querySelectorAll('.gt').forEach(function(t) { t.classList.remove('on'); });
    this.classList.add('on');
  });
});

// ─ WISHLIST ─
document.querySelectorAll('.wbtn').forEach(function(b) {
  b.addEventListener('click', function(e) {
    e.stopPropagation();
    this.style.color = '#8B1A2A';
    this.style.borderColor = '#8B1A2A';
    this.innerHTML = '&#x2665;';
    toast('Added to wishlist');
  });
});

// ─ KEYBOARD ─
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeSrch(); closeSG(); closeEP(); closeAll(); }
});

// ─ INIT ─
renderCart();
