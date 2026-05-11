import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, 
  Phone, 
  CheckCircle2, 
  Truck, 
  Scale, 
  Users, 
  Award, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  MessageSquare,
  Wheat,
  MapPin,
  Clock
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  nameGu: string;
  nameEn: string;
  badge?: string;
  emoji: string;
  description: string;
  gradient: string;
}

interface Toast {
  id: string;
  message: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    nameGu: 'લીલા મગ',
    nameEn: 'Green Mung',
    badge: 'Best Seller',
    emoji: '🌿',
    description: 'Fresh, protein-rich green mung beans from local farms.',
    gradient: 'from-green-100 to-green-200'
  },
  {
    id: '2',
    nameGu: 'મગ દાળ',
    nameEn: 'Mung Dal',
    badge: 'Fresh',
    emoji: '💛',
    description: 'Polished to perfection, easy to cook and digest.',
    gradient: 'from-yellow-50 to-yellow-100'
  },
  {
    id: '3',
    nameGu: 'મસૂર દાળ',
    nameEn: 'Masoor Dal',
    badge: 'Premium',
    emoji: '🧡',
    description: 'High-quality red masoor dal for authentic taste.',
    gradient: 'from-orange-50 to-orange-100'
  }   ,
  {
    id: '4',
    nameGu: 'ચણા દાળ',
    nameEn: 'Chana Dal',
    emoji: '🌰',
    description: 'Delicious and nutty chana dal, source of energy.',
    gradient: 'from-amber-50 to-amber-100'
  },
  {
    id: '5',
    nameGu: 'તુવેર દાળ',
    nameEn: 'Tuvar Dal',
    emoji: '🥘',
    description: 'Pure tuvar dal, the staple of every Gujarati kitchen.',
    gradient: 'from-yellow-100 to-amber-50'
  },
  {
    id: '6',
    nameGu: 'ફૅમિલી કૉમ્બો',
    nameEn: 'Family Combo',
    badge: 'Combo',
    emoji: '🎁',
    description: 'A mix of our top 4 products for your family.',
    gradient: 'from-green-50 to-gold-light/20'
  }
];

const WHY_US = [
  { gu: 'ખેડૂત સીધો', en: 'Farmer Direct', icon: <Wheat className="w-6 h-6" /> },
  { gu: 'સાચો વજન', en: 'Honest Weight', icon: <Scale className="w-6 h-6" /> },
  { gu: 'ઘરે ડિલિવરી', en: 'Home Delivery', icon: <Truck className="w-6 h-6" /> },
  { gu: 'Machine Cleaned', en: 'Seed Cleaner', icon: <CheckCircle2 className="w-6 h-6" /> },
  { gu: 'Sealed Packaging', en: 'Quality Packing', icon: <ShoppingBag className="w-6 h-6" /> },
  { gu: '500+ Happy Customers', en: 'Trusted Local Brand', icon: <Users className="w-6 h-6" /> }
];

const TESTIMONIALS = [
  { name: 'Rekhaben, Mahuva', rating: 5, text: 'તમારા મગની દાળ ખૂબ જ સરસ છે. એકદમ ચોખ્ખી અને સ્વાદિષ્ટ!' },
  { name: 'Jignesh bhai, Ahmedabad', rating: 5, text: 'સૌથી સારી વાત તો એ છે કે સીધું ઘરે આવી જાય છે. વજન પણ બરોબર છે.' },
  { name: 'Meena Tiffin Service, Surat', rating: 5, text: 'અમે અમારા ટિફિન સર્વિસ માટે હંમેશા શૌર્ય બીન્સનો જ ઉપયોગ કરીએ છીએ.' }
];

// --- Components ---

const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <AnimatePresence>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="bg-green-deep text-white px-6 py-4 rounded-xl shadow-2xl glass flex items-center gap-3 min-w-[280px]"
        >
          <div className="bg-green-bright rounded-full p-1">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">{toast.message}</span>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default function App() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("✅ ઓર્ડર સફળતાપૂર્વક લેવામાં આવ્યો છે!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative min-h-screen">
      {/* 🧭 Sticky Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-green-deep p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Wheat className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-green-deep tracking-tight">
              શૌર્ય <span className="text-gold">🌱</span> Beans
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="font-medium text-text-mid hover:text-green-deep transition-colors">Products</a>
            <a href="#why-us" className="font-medium text-text-mid hover:text-green-deep transition-colors">Why Us</a>
            <a href="#reviews" className="font-medium text-text-mid hover:text-green-deep transition-colors">Reviews</a>
            <a 
              href="#order"
              className="bg-green-deep text-white px-8 py-3 rounded-full font-bold hover:bg-green-mid hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              ઓર્ડર કરો
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-green-deep">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl">
              <a onClick={() => setMobileMenuOpen(false)} href="#products" className="font-bold text-text-dark">Products</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#why-us" className="font-bold text-text-dark">Why Us</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#reviews" className="font-bold text-text-dark">Reviews</a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                href="#order"
                className="bg-green-deep text-white text-center py-4 rounded-xl font-bold"
              >
                ઓર્ડર કરો
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🦸 Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#faf6ed_0%,transparent_50%)]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-green-light/10 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100"
            >
              <div className="w-2 h-2 rounded-full bg-green-mid animate-pulse" />
              <span className="text-green-mid font-bold text-sm tracking-wide uppercase">Direct from Gujarat's Farms</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-green-deep leading-[0.95]"
            >
              શ્રેષ્ઠ મગ, <br />
              <span className="text-gold italic font-serif">શ્રેષ્ઠ સ્વાદ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-text-mid max-w-xl leading-relaxed"
            >
              Best Beans, Best Life. 100% pure, farmer-direct, delivered to your door in Mahuva. 
              <span className="block font-bold mt-2">"ખેડૂત સીધો — ઘર સુધી"</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <a 
                href="#products"
                className="w-full sm:w-auto bg-green-deep text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-green-mid transition-all shadow-xl hover:shadow-green-900/20 flex items-center justify-center gap-2 group"
              >
                Shop Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="tel:+917600841090"
                className="w-full sm:w-auto bg-white text-green-deep border-2 border-green-deep px-10 py-5 rounded-full font-bold text-lg hover:bg-cream transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="flex-1 relative"
          >
            <div className="animate-float relative z-10">
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(26,58,26,0.15)] border border-white/40 max-w-md mx-auto">
                <div className="aspect-square bg-gradient-to-br from-green-50 to-gold-light/20 rounded-3xl flex items-center justify-center mb-6 overflow-hidden relative group">
                  <span className="text-9xl group-hover:scale-110 transition-transform duration-500">🌿</span>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-gold text-gold" />)}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-black text-green-deep">લીલા મગ</h3>
                  </div>
                  <p className="text-text-mid">Polished naturally. High in protein. Direct from the field of Mahuva.</p>
                  <div className="flex items-center gap-4 py-2 border-t border-cream">
                    <div className="flex -space-x-2">
                       {[0, 1, 2].map((i) => (
                         <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${['bg-green-deep', 'bg-gold', 'bg-teal-600'][i]}`}>
                           {['SP', 'PS', 'RM'][i]}
                         </div>
                       ))}
                    </div>
                    <span className="text-sm font-bold text-text-light">500+ Happy Households</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[80px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 📣 Scrolling Marquee */}
      <div className="bg-gold py-4 overflow-hidden border-y border-gold-light/30">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-5 text-green-deep font-black text-xl uppercase tracking-widest">
              <span>ભેળસેળ મુક્ત</span> <span className="w-2 h-2 rounded-full bg-green-deep/20" />
              <span>ઘરે ડિલિવરી</span> <span className="w-2 h-2 rounded-full bg-green-deep/20" />
              <span>ખેડૂત સીધો</span> <span className="w-2 h-2 rounded-full bg-green-deep/20" />
              <span>ટ્રસ્ટેડ</span> <span className="w-2 h-2 rounded-full bg-green-deep/20" />
              <span>500+ ગ્રાહક</span> <span className="w-2 h-2 rounded-full bg-green-deep/20" />
              <span>મહુવા</span> <span className="w-2 h-2 rounded-full bg-green-deep/20" />
            </div>
          ))}
        </div>
      </div>

      {/* 🛒 Products Section */}
      <section id="products" className="py-32 bg-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm">Organic Collection</span>
              <h2 className="text-5xl font-black text-green-deep">અમારા ઉત્પાદનો</h2>
              <p className="text-xl text-text-mid max-w-lg">Premium pulses, handpicked and cleaned with high-tech machinery for your health.</p>
            </div>
            <div className="flex gap-4">
               {/* Filters or badges could go here */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-cream hover:border-gold-light/50"
              >
                {product.badge && (
                  <span className="absolute top-6 left-6 z-10 bg-green-deep text-white text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-wider">
                    {product.badge}
                  </span>
                )}
                
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-8 overflow-hidden`}>
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-text-light font-medium text-sm mb-1">{product.nameEn}</span>
                    <h3 className="text-2xl font-black text-green-deep">{product.nameGu}</h3>
                  </div>
                  <p className="text-text-mid text-sm leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-end pt-4">
                    <button 
                      onClick={() => addToast(`✅ ${product.nameGu} ઉમેરાઈ ગયું!`)}
                      className="bg-green-deep text-white p-3 rounded-xl hover:bg-green-mid transition-colors group/btn shadow-md hover:shadow-green-900/20"
                    >
                      <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ Why Shaurya Beans */}
      <section id="why-us" className="py-32 bg-green-deep relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm">Premium Quality</span>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">તમે Shaurya Beans <span className="text-gold">શા માટે પસંદ કરશો?</span></h2>
              <p className="text-green-light/80 text-xl leading-relaxed">
                અમે ફક્ત અનાજ નથી વેચતા, અમે ભરોસો વેચીએ છીએ. ખેડૂતથી સીધું તમારા રસોડા સુધી — શુદ્ધતાની ગેરંટી સાથે.
              </p>
              <div className="pt-4">
                <a href="#order" className="inline-flex items-center gap-2 bg-gold text-green-deep px-8 py-4 rounded-full font-black hover:bg-gold-light transition-all">
                  Get Started <ChevronRight />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_US.map((item, idx) => (
                <motion.div
                  key={item.en}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors group"
                >
                  <div className="bg-gold/20 p-3 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6 text-gold' })}
                  </div>
                  <h4 className="text-white font-bold text-lg mb-1">{item.gu}</h4>
                  <p className="text-green-light/60 text-sm">{item.en}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section id="reviews" className="py-32 bg-cream/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
             <MessageSquare className="w-10 h-10 text-gold mx-auto" />
             <h2 className="text-4xl font-black text-green-deep">ગ્રાહકોના અનુભવો</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[32px] shadow-sm relative group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
                </div>
                <p className="text-text-mid italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center font-bold text-gold">
                    {t.name[0]}
                  </div>
                  <span className="font-bold text-green-deep text-sm">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📋 Order Form */}
      <section id="order" className="py-32 bg-warm-white relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(26,58,26,0.1)] border border-cream"
          >
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-black text-green-deep underline decoration-gold decoration-4 underline-offset-8">ઓર્ડર આપો</h2>
              <p className="text-text-mid">Fill out the form below and we'll deliver to your doorstep!</p>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-mid">તમારું નામ (Name)</label>
                  <input required type="text" placeholder="Shaurya Patel" className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-gold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-mid">મોબાઈલ નંબર (Mobile)</label>
                  <input required type="tel" placeholder="+91 9XXXX XXXXX" className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-gold transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-mid">તમારું શહેર (City)</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-gold transition-all outline-none appearance-none">
                    <option>Mahuva (મહુવા)</option>
                    <option>Ahmedabad (અમદાવાદ)</option>
                    <option>Surat (સુરત)</option>
                    <option>Jamnagar (જામનગર)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-mid">વસ્તુ પસંદ કરો (Product)</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-gold transition-all outline-none appearance-none">
                    {PRODUCTS.map(p => <option key={p.id}>{p.nameGu} ({p.nameEn})</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-mid">ડિલિવરી સરનામું (Address)</label>
                <textarea required rows={3} placeholder="House no, Street name, Area..." className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-gold transition-all" />
              </div>

              <button 
                type="submit"
                className="w-full bg-green-deep text-white py-6 rounded-2xl font-black text-xl hover:bg-green-mid transition-all shadow-xl hover:shadow-green-900/30 flex items-center justify-center gap-3 active:scale-95"
              >
                ✅ ઓર્ડર આપો — ઘરે ડિલિવરી
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 🦶 Footer */}
      <footer className="bg-[#0d200d] text-white pt-24 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center gap-2">
                 <Wheat className="text-gold w-8 h-8" />
                 <span className="text-3xl font-black tracking-tight">શૌર્ય <span className="text-gold">🌱</span> Beans</span>
              </div>
              <p className="text-green-light/60 leading-relaxed italic">"ખેડૂત સીધો — ઘર સુધી"</p>
              <div className="flex gap-4">
                {/* Social icons could go here */}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-gold font-black uppercase text-xs tracking-widest">Connect</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-green-light/80 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-gold" /> +91 7600841090
                </li>
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=7600841090" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 text-green-light/80 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 text-gold" /> WhatsApp Support
                  </a>
                </li>
                <li className="flex items-center gap-3 text-green-light/80 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-gold" /> Mahuva, Gujarat
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-gold font-black uppercase text-xs tracking-widest">Timings</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-green-light/80">
                  <Clock className="w-5 h-5 text-gold" /> Morning: 8 AM - 12 PM
                </li>
                <li className="flex items-center gap-3 text-green-light/80">
                  <Clock className="w-5 h-5 text-gold" /> Evening: 4 PM - 8 PM
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-green-light/40 text-[10px] uppercase font-black tracking-widest">
            <p>© 2026 Shaurya Beans. Proudly Made in Gujarat.</p>
            <div className="flex gap-8">
              <button 
                onClick={() => setShowPrivacy(true)} 
                className="hover:text-gold transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTerms(true)} 
                className="hover:text-gold transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer toasts={toasts} removeToast={(id) => setToasts(t => t.filter(x => x.id !== id))} />

      {/* Legal Modals */}
      <LegalModal 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
        title="Privacy Policy"
        guTitle="ગોપનીયતા નીતિ"
      >
        <div className="space-y-6 text-text-mid leading-relaxed">
          <section>
            <h4 className="font-bold text-green-deep mb-2">1. માહિતી સંગ્રહ (Information Collection)</h4>
            <p>અમે તમારા ઓર્ડરની ડિલિવરી માટે ફક્ત જરૂરી માહિતી (નામ, મોબાઈલ નંબર, અને સરનામું) જ મેળવીએ છીએ.</p>
            <p className="text-xs italic">We only collect essential information (name, mobile, address) strictly for delivery purposes.</p>
          </section>
          <section>
            <h4 className="font-bold text-green-deep mb-2">2. ડેટા સુરક્ષા (Data Security)</h4>
            <p>તમારી માહિતી સુરક્ષિત રાખવામાં આવે છે અને તે ક્યારેય અન્ય કોઈ તૃતીય પક્ષ (Third Party) ને વેચવામાં આવતી નથી.</p>
            <p className="text-xs italic">Your data is stored securely and is never sold to any third party.</p>
          </section>
          <section>
            <h4 className="font-bold text-green-deep mb-2">3. ડિલિવરી અપડેટ્સ (Delivery Updates)</h4>
            <p>તમારા મોબાઈલ નંબરનો ઉપયોગ ફક્ત ઓર્ડરની વિગતો અને ડિલિવરી સ્ટેટ્સ માટે વૉટ્સએપ કે કૉલ દ્વારા કરવામાં આવશે.</p>
            <p className="text-xs italic">Your mobile number is strictly used for order updates via WhatsApp or call.</p>
          </section>
        </div>
      </LegalModal>

      <LegalModal 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        title="Terms of Service"
        guTitle="સેવાની શરતો"
      >
        <div className="space-y-6 text-text-mid leading-relaxed">
          <section>
            <h4 className="font-bold text-green-deep mb-2">1. ઓર્ડર અને ડિલિવરી (Order & Delivery)</h4>
            <p>ઓર્ડર આપ્યાના ૨૪ કલાકની અંદર ડિલિવરી કરવામાં આવશે (મહુવા વિસ્તારમાં).</p>
            <p className="text-xs italic">Deliveries are typically completed within 24 hours of ordering (within Mahuva).</p>
          </section>
          <section>
            <h4 className="font-bold text-green-deep mb-2">2. ચૂકવણી (Payment)</h4>
            <p>અમે હાલમાં કેશ ઓન ડિલિવરી (Cash on Delivery) સ્વીકારીએ છીએ.</p>
            <p className="text-xs italic">Payment is accepted via Cash on Delivery.</p>
          </section>
          <section>
            <h4 className="font-bold text-green-deep mb-2">3. વળતર અને રિફંડ (Returns)</h4>
            <p>જો અનાજમાં કોઈ ખામી જણાય, તો તમે ડિલિવરી સમયે જ તે પરત કરી શકો છો.</p>
            <p className="text-xs italic">If any quality issues are found, products can be returned at the time of delivery.</p>
          </section>
        </div>
      </LegalModal>
    </div>
  );
}

// --- Helper Component ---
const LegalModal = ({ isOpen, onClose, title, guTitle, children }: { isOpen: boolean, onClose: () => void, title: string, guTitle: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-green-deep/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden"
        >
          <div className="bg-cream p-8 flex justify-between items-center border-b border-gold/10">
            <div>
              <h3 className="text-3xl font-black text-green-deep">{guTitle}</h3>
              <p className="text-gold font-bold text-sm tracking-widest uppercase">{title}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gold/10 rounded-full transition-colors">
              <X className="w-8 h-8 text-green-deep" />
            </button>
          </div>
          <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>
          <div className="p-8 bg-warm-white border-t border-cream flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-green-deep text-white rounded-full font-bold hover:bg-green-mid transition-colors"
            >
              સમજાઈ ગયું / Close
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
