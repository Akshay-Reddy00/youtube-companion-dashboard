import { Link } from "react-router-dom";
import { 
  PlayCircle, 
  MessageSquare, 
  FileText, 
  Edit3
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-6">
          <Link 
            to="/login" 
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="text-gray-300 hover:text-white transition-colors font-medium px-6 py-2 border border-gray-600 rounded-lg hover:border-gray-400"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-relaxed">
            Manage Your YouTube Video
            <span className="block text-gray-300 font-normal mt-2">
              Like Never Before
            </span>
          </h1>
          <p className="text-base text-gray-400 max-w-xl">
            A focused mini-dashboard for content creators. Track, improve, and manage 
            your video with powerful notes, comments, and insights—all in one place.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full px-6 py-16 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white text-center mb-20">
            Everything You Need to Excel
          </h2>
          <div className="flex flex-wrap justify-center items-start gap-16">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center text-center w-56">
              <PlayCircle className="w-6 h-6 text-red-500 mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-white mb-2">Video Overview</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fetch and display complete details about your uploaded video.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center text-center w-56">
              <FileText className="w-6 h-6 text-purple-500 mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-white mb-2">Smart Notes</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Jot down improvement ideas with tags and search.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center text-center w-56">
              <MessageSquare className="w-6 h-6 text-blue-500 mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-white mb-2">Internal Comments</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Add private comments and replies for collaboration.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center justify-center text-center w-56">
              <Edit3 className="w-6 h-6 text-green-500 mb-5" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-white mb-2">Edit on the Fly</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Quickly update video title and description.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-6 py-10 mt-2 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            How It Works
          </h2>
          <div className="w-full flex flex-col items-center gap-1">
            <div className="w-full max-w-2xl bg-white/5 rounded-lg p-5">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-red-500 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <div className="text-center flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Upload to YouTube</h3>
                  <p className="text-gray-400 text-sm">
                    Paste a video url from YouTube directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl bg-white/5 rounded-lg p-5">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-purple-500 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <div className="text-center flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Connect Your Video</h3>
                  <p className="text-gray-400 text-sm">
                    Link your video to the dashboard and fetch all details via YouTube API.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl bg-white/5 rounded-lg p-5">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <div className="text-center flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Manage & Improve</h3>
                  <p className="text-gray-400 text-sm">
                    Add notes, internal comments, tagging for better search, and track your improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 py-16 flex-grow">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <div className="border border-gray-700 rounded-2xl p-12 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-white mb-8">
              Ready to Level Up Your Content?
            </h2>
            <p className="text-base text-gray-400 max-w-xl mx-auto">
              Join content creators who are streamlining their workflow and improving their videos.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-2 py-2 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <p className="text-gray-400 text-sm">
            © 2025 YouTube Mini Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

