import TopBar from '@/components/TopBar'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import About from '@/components/About'
import JournalSection from '@/components/JournalSection'
import DeliverySection from '@/components/DeliverySection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import CartDrawer from '@/components/CartDrawer'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <CustomCursor />
        <TopBar />
        <Navigation />
        <Hero />
        <ProductGrid />
        <About />
        <JournalSection />
        <DeliverySection />
        <Footer />
      </main>
      <CartDrawer />
    </>
  )
}
