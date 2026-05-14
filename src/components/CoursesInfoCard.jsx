import ExerciseListCard from "./ExerciseListCard.jsx";
export default function CourseCard({
  courseName,
  courseDescription,
  courseLevel,
  courseCategory,
  courseDuration,
}) {
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-start text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-slide-up" style={{ animationFillMode: 'both' }}>
        {/* Decorative glowing orb */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/15 rounded-full blur-[60px] -z-10 pointer-events-none animate-pulse-glow"></div>

        <div className="mb-6 flex items-start md:items-center gap-4 relative z-10">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-3xl">
            <i className="fas fa-book-open text-white"></i>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm tracking-tight leading-none m-0">
                {courseName}
              </h1>
              <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 text-xs font-bold text-orange-400 uppercase tracking-widest leading-none">
                Course Program
              </span>
            </div>
            <p className="mt-2 text-base text-gray-400 max-w-3xl leading-relaxed">
              {courseDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-orange-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <i className="fas fa-layer-group text-blue-400 text-xs"></i>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Level</p>
            </div>
            <p className="text-xl font-bold text-white ml-10">{courseLevel}</p>
          </div>

          <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-orange-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <i className="fas fa-tags text-green-400 text-xs"></i>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</p>
            </div>
            <p className="text-xl font-bold text-white ml-10">{courseCategory}</p>
          </div>

          <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-orange-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <i className="fas fa-clock text-purple-400 text-xs"></i>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</p>
            </div>
            <p className="text-xl font-bold text-white ml-10">{courseDuration}</p>
          </div>
        </div>
      </div>
    </>
  );
}