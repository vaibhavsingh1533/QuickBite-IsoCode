import { AlertCircle, LoaderCircle, Plus, Minus, ShoppingBag } from 'lucide-react'
import { imageUrl } from '../data'
export function Button({ children, variant='primary', className='', ...props }) { return <button className={`button button-${variant} ${className}`} {...props}>{children}</button> }
export function FoodCard({ dish, onAdd }) { return <article className="food-card"><div className="food-image-wrap"><img src={imageUrl(dish.image,700)} alt={dish.name} loading="lazy"/><span className="food-tag">{dish.tag}</span><button className="add-round" aria-label={`Add ${dish.name} to cart`} onClick={onAdd}><Plus size={20}/></button></div><div className="food-info"><div className="food-heading"><h3>{dish.name}</h3><strong>₹{dish.price}</strong></div><p>{dish.desc}</p></div></article> }
export function QuantityControl({ qty, onChange }) { return <div className="qty-control"><button aria-label="Decrease quantity" onClick={()=>onChange(qty-1)}><Minus size={14}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>onChange(qty+1)}><Plus size={14}/></button></div> }
export function EmptyState({ title, text, icon: Icon=ShoppingBag }) { return <div className="state-box"><Icon size={28}/><h3>{title}</h3><p>{text}</p></div> }
export function ErrorState({ text='Something went wrong. Please try again.' }) { return <div className="state-box"><AlertCircle size={26}/><h3>We hit a snag</h3><p>{text}</p></div> }
export function LoadingState() { return <div className="loading"><LoaderCircle className="spin"/> Loading…</div> }
export function StatusBadge({ status }) { return <span className={`status status-${status.toLowerCase()}`}>{status}</span> }
