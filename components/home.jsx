export default function Home() {
  return (
    <main className="relative z-1 min-h-screen flex flex-col">
      <div className="mt-auto p-8">
        <div className="max-w-2xl mb-8 ml-8">
          <h1 className="text-4xl mb-4 text-stone-800">
            Streamline Your Restaurant Operations
          </h1>
          
          <p className="font-sans text-lg leading-relaxed mb-8 text-stone-600">
            Manage orders, reservations, staff, and inventory all in one place.
            Our intuitive dashboard gives you real-time insights to boost efficiency
            and enhance your customer experience.
          </p>
          
          <div className="flex gap-4">
            <button className="py-3 px-6 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-900 transition-colors">
              Get Started
            </button>
            
            <button className="py-3 px-6 bg-transparent text-stone-800 border-2 border-stone-800 rounded-lg font-semibold hover:bg-stone-100 transition-colors">
              Watch Demo
            </button>
          </div>
          
          <div className="flex items-center mt-8">
            <div className="flex mr-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-stone-300 border-2 border-stone-400"
                  style={{ marginLeft: i > 0 ? '-10px' : '0' }}
                />
              ))}
            </div>
            <p className="text-stone-600 text-sm">
              Trusted by 500+ restaurants worldwide
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
