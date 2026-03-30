'use client'

type OrderSuccessProps = {
  orderId: string
  onBack: () => void
}

export default function OrderSuccess({ orderId, onBack }: OrderSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-8 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-success-green flex items-center justify-center mb-6">
        <span className="text-3xl text-soft-white">✓</span>
      </div>
      <h3 className="font-serif text-2xl font-semibold text-card-brown mb-2">Заказ оформлен ✓</h3>
      <p className="font-sans text-charcoal text-sm mb-1">Номер заказа</p>
      <p className="font-serif text-xl font-semibold text-accent-gold mb-4">{orderId}</p>
      <p className="font-sans text-charcoal text-sm mb-8">Доставка СДЭК</p>
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-3 rounded-lg border-2 border-input-border text-card-brown font-sans font-medium hover:border-accent-gold hover:text-accent-gold transition-colors"
      >
        Назад к корзине
      </button>
    </div>
  )
}
