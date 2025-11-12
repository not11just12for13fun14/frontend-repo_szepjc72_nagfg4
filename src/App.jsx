import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function currency(n){
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n||0)
}

function Header({onOpenCart, onOpenAuth}){
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop" alt="logo" className="w-8 h-8 rounded" />
          <span className="font-semibold text-pink-600">Glowify</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#home" className="hover:text-pink-600">Home</a>
          <a href="#products" className="hover:text-pink-600">Produk</a>
          <a href="#chat" className="hover:text-pink-600">Chat</a>
          <a href="#contact" className="hover:text-pink-600">Kontak</a>
          <a href="#maps" className="hover:text-pink-600">Maps</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onOpenAuth} className="p-2 rounded hover:bg-gray-100" aria-label="Akun">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75c-2.69 0-5.243-.584-7.5-1.632Z"/></svg>
          </button>
          <button onClick={onOpenCart} className="p-2 rounded hover:bg-gray-100 relative" aria-label="Keranjang">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 0 1 1.44 1.08L5.67 6M7.5 14.25h11.218a1.5 1.5 0 0 0 1.463-1.17l1.347-6.072A1.5 1.5 0 0 0 20.074 5.25H6m0 0L5.25 3M6 5.25l1.5 9"/><path d="M8.25 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm9 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/></svg>
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section id="home" className="bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">Selamat datang di Glowify</h1>
          <p className="mt-4 text-gray-600">Toko e-commerce skincare dengan pilihan produk berkualitas untuk berbagai permasalahan kulit.</p>
          <a href="#products" className="inline-block mt-6 bg-pink-600 text-white px-5 py-3 rounded-lg hover:bg-pink-700">Belanja Sekarang</a>
        </div>
        <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=900&auto=format&fit=crop" alt="Skincare" className="w-full rounded-xl shadow-lg" />
      </div>
    </section>
  )
}

function ProductCard({p, onAdd}){
  return (
    <div className="group border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover rounded-md" />
      <div className="mt-3">
        <h3 className="font-semibold text-gray-800 group-hover:text-pink-600">{p.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-gray-800">{currency(p.price)}</span>
          <button onClick={() => onAdd(p)} className="bg-pink-600 text-white px-3 py-1.5 rounded hover:bg-pink-700">Tambah</button>
        </div>
      </div>
    </div>
  )
}

function Products({user, onAdd}){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE}/api/products`).then(r=>r.json()).then(setProducts).catch(()=>{})
  },[])
  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Produk Unggulan</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p=> <ProductCard key={p.id} p={p} onAdd={(p)=> onAdd(p)} />)}
      </div>
    </section>
  )
}

function CartDrawer({open, onClose, items, total, onCheckout}){
  return (
    <div className={`fixed inset-0 z-50 ${open? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 transition ${open? 'opacity-100' : 'opacity-0'}`} onClick={onClose}/>
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition translate-x-${open? '0' : '[100%]'} p-4 flex flex-col`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Keranjang</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">Tutup</button>
        </div>
        <div className="flex-1 overflow-y-auto divide-y">
          {items.length===0 && <p className="text-gray-500">Keranjang kosong</p>}
          {items.map((it,idx)=> (
            <div key={idx} className="py-3 flex gap-3">
              <img src={it.image_url} alt={it.title} className="w-16 h-16 object-cover rounded"/>
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-500">{it.quantity} x {currency(it.price)}</div>
              </div>
              <div className="font-semibold">{currency(it.subtotal)}</div>
            </div>
          ))}
        </div>
        <div className="border-t pt-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Total</span>
            <span className="font-bold">{currency(total)}</span>
          </div>
          <button onClick={onCheckout} disabled={items.length===0} className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50">Checkout</button>
        </div>
      </div>
    </div>
  )
}

function AuthModal({open, onClose, onLoggedIn}){
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      if(mode==='register'){
        const r = await fetch(`${API_BASE}/api/auth/register`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name, email, password})})
        if(!r.ok) throw new Error(await r.text())
      }
      const r2 = await fetch(`${API_BASE}/api/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password})})
      const data = await r2.json()
      if(!r2.ok) throw new Error(data?.detail || 'Gagal login')
      onLoggedIn(data)
      onClose()
    }catch(err){ setError('Terjadi kesalahan. Pastikan data benar.') }
  }

  return (
    <div className={`fixed inset-0 z-50 ${open? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{mode==='login'? 'Masuk' : 'Daftar'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">Tutup</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode==='register' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nama Lengkap" className="w-full border rounded px-3 py-2" required/>
          )}
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" required/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border rounded px-3 py-2" required/>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">{mode==='login'? 'Masuk' : 'Daftar & Masuk'}</button>
        </form>
        <div className="text-sm text-center mt-3">
          {mode==='login'? (
            <button onClick={()=>setMode('register')} className="text-pink-600 hover:underline">Belum punya akun? Daftar</button>
          ) : (
            <button onClick={()=>setMode('login')} className="text-pink-600 hover:underline">Sudah punya akun? Masuk</button>
          )}
        </div>
      </div>
    </div>
  )
}

function Chatbot(){
  const [q, setQ] = useState('')
  const [messages, setMessages] = useState([{role:'bot', text:'Hai! Ceritakan masalah kulitmu (jerawat, kusam, kering, berminyak).'}])
  const ask = async ()=>{
    if(!q.trim()) return
    const userMsg = {role:'user', text:q}
    setMessages(m=>[...m, userMsg])
    setQ('')
    try{
      const r = await fetch(`${API_BASE}/api/chat`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({question: userMsg.text})})
      const data = await r.json()
      setMessages(m=>[...m, {role:'bot', text:data.answer}])
    }catch{ setMessages(m=>[...m, {role:'bot', text:'Maaf, terjadi kendala.'}]) }
  }
  return (
    <section id="chat" className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">Chat Bantuan Kulit</h2>
      <div className="border rounded-xl p-4 bg-white">
        <div className="h-64 overflow-y-auto space-y-2">
          {messages.map((m,i)=> (
            <div key={i} className={`px-3 py-2 rounded max-w-[80%] ${m.role==='bot'? 'bg-pink-50 text-pink-800' : 'bg-gray-100 ml-auto'}`}>{m.text}</div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tulis pertanyaanmu..." className="flex-1 border rounded px-3 py-2"/>
          <button onClick={ask} className="bg-pink-600 text-white px-4 rounded">Kirim</button>
        </div>
      </div>
    </section>
  )
}

function Contact(){
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h2 className="text-2xl font-bold mb-2">Kontak Kami</h2>
        <p className="text-gray-600 mb-4">Butuh bantuan? Hubungi kami melalui form berikut.</p>
        <form className="space-y-3">
          <input placeholder="Nama" className="w-full border rounded px-3 py-2"/>
          <input placeholder="Email" type="email" className="w-full border rounded px-3 py-2"/>
          <textarea placeholder="Pesan" className="w-full border rounded px-3 py-2 h-28"/>
          <button type="button" className="bg-pink-600 text-white px-4 py-2 rounded">Kirim</button>
        </form>
      </div>
      <div id="maps" className="rounded-xl overflow-hidden shadow">
        <iframe title="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.619646139503!2d106.816666!3d-6.188888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e5f51a3b81%3A0x301576d14febd50!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000" width="100%" height="320" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
  )
}

function App(){
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState({items:[], total:0})

  const addToCart = async (p)=>{
    if(!user){ setAuthOpen(true); return }
    await fetch(`${API_BASE}/api/cart/add`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id:user.user_id, product_id:p.id, quantity:1})})
    loadCart()
    setCartOpen(true)
  }

  const loadCart = async ()=>{
    if(!user) return
    const r = await fetch(`${API_BASE}/api/cart/${user.user_id}`)
    const data = await r.json()
    setCart(data)
  }

  useEffect(()=>{ loadCart() }, [user])

  const checkout = async ()=>{
    const r = await fetch(`${API_BASE}/api/checkout`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id:user.user_id})})
    const data = await r.json()
    if(r.ok){
      alert(`Pesanan dibuat. Total: ${currency(data.total)}`)
      loadCart()
      setCartOpen(false)
    } else {
      alert(data.detail || 'Gagal checkout')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header onOpenCart={()=>setCartOpen(true)} onOpenAuth={()=>setAuthOpen(true)} />
      <Hero />
      <Products user={user} onAdd={addToCart} />
      <Chatbot />
      <Contact />

      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cart.items} total={cart.total} onCheckout={checkout} />
      <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onLoggedIn={(u)=> setUser(u)} />
    </div>
  )
}

export default App
