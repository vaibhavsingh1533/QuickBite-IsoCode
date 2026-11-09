import { createContext, useContext, useMemo, useState } from 'react'
const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const add = dish => setItems(prev => { const found=prev.find(x=>x.id===dish.id); return found ? prev.map(x=>x.id===dish.id?{...x,qty:x.qty+1}:x) : [...prev,{...dish,qty:1}] })
  const setQty = (id, qty) => setItems(prev => qty <= 0 ? prev.filter(x=>x.id!==id) : prev.map(x=>x.id===id?{...x,qty:Math.min(99,qty)}:x))
  const clear = () => setItems([])
  const count = items.reduce((sum,x)=>sum+x.qty,0)
  const subtotal = items.reduce((sum,x)=>sum+x.price*x.qty,0)
  const value = useMemo(()=>({items,add,setQty,clear,count,subtotal}),[items,count,subtotal])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)
