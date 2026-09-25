import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#d7c3aa] px-4 py-6 mt-4"> {/* changed mt-8 → mt-4 */}
      <div className="max-w-md mx-auto text-center px-4"> {/* changed max-w-7xl → max-w-xl */}
        <p className="text-[#64401e] text-sm">
          Latest Model: Gruyere-1.1
        </p>
        <p className="text-[#64401e] text-sm">
          gouda AI 0.2.0
        </p>
        <Link 
            href="/privacypolicy" 
            className="text-[#64401e] text-sm"
          >
            Privacy Policy
        </Link>
      </div>
    </footer>
  )
}