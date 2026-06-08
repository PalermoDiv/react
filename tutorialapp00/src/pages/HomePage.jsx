import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* -------- This is how to do a Hero section normally --------*/}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-gray-950 to-gray-950 -z-10" />
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">From the React Tutorial</span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Learn React by <span className="text-indigo-400">Building</span></h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">Blueprints so you can learn how to do important react patterns with real world examples. Check all the source code on github</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to='/about' className='px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg transition-colors border border-gray-700'>Go to about page</Link>
        </div>
      </section>
      {/*-------- List of features the page could have ---------*/}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">React Blueprints</h3>
            <p className="text-gray-400 leading-relaxed">Every concept is a self contained reference to drop into projects</p>
          </div>
        </div>
      </section>
    </div>
  );
}