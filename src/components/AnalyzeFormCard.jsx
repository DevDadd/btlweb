export default function AnalyzeFormCard({ onUploadVideo }) {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/90 to-red-900/90 p-8 shadow-[0_10px_40px_rgba(239,68,68,0.3)] backdrop-blur-md animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
            Ready to check your form?
          </h2>
          <p className="mt-2 text-base font-medium text-red-100 max-w-xl">
            Upload a video and get AI-powered feedback on your technique.
          </p>
        </div>

        <button
          type="button"
          onClick={onUploadVideo}
          className="shrink-0 rounded-full bg-white px-8 py-3.5 text-base font-bold text-red-600 shadow-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2"
        >
          <i className="fas fa-video"></i> Analyze My Form
        </button>
      </div>
    </div>
  );
}