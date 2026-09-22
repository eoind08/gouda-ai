export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] py-8">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2629682720782125"
     crossOrigin="anonymous"></script>
      <meta name="google-adsense-account" content="ca-pub-2629682720782125"></meta>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#d7c3aa] rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-[#64401e] text-center mb-8">
            About Gouda
          </h1>
          
          <div className="space-y-6 text-[#64401e] leading-relaxed">
            <p>
              Gouda AI was founded in 2025 as a way to learn the theory behind Machine Learning, since my GPU is old I couldn't train gouda very well,
              its trained on just 0.1 Epochs of the Fineweb EDU dataset and so responses are completely incoherent. I have tried to keep this project to either
              completely free or as cheap as possible for me and so gouda itself cost nothing for me to make and the only cost has been a server to host it
            </p>
            
            <p>
              Whilst I continue to work on coherent AI projects as well as an equally bad image generator, in the mean time I thought I should give access to the treasure
              trove of responses Gouda-XS1 can give. The responses are often funny and while some interpret Gouda to be just a bad ai, we have turned this into a deliberate feature
              for all to enjoy.
            </p>
            <p>
              All revenue earned by gouda will go directly into the development of more models and improvements to the site and API. Maybe we will even branch out into making 
              AI's that serve more purpose than just humour through gibberish.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}