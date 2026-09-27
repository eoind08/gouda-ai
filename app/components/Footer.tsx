import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-beige px-4 py-6 mt-4 transition-colors duration-300">
      <div className="max-w-md mx-auto text-center px-4">
        <p className="text-chocolate text-sm">
          Latest Model: Gruyère-1.2
        </p>

        <p className="text-chocolate text-sm">
          Gouda AI 0.2.1
        </p>

        <Link
          href="/privacypolicy"
          className="text-chocolate text-sm hover:opacity-60 transition-opacity"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}