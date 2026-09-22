export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] py-8">
      <meta name="google-adsense-account" content="ca-pub-2629682720782125"></meta>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2629682720782125"
     crossOrigin="anonymous"></script>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#64401e] text-center mb-8">
            Account Settings
          </h1>
          
          <div className="text-center text-gray-600">
            <div className="mb-6">
              <div className="w-24 h-24 bg-[#d7c3aa] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#f5f0e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#64401e] mb-2">Welcome to Your Account</h2>
              <p className="text-gray-600">
                Accounts are coming soon, this will include access to pro models
              </p>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}