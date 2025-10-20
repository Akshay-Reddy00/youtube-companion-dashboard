import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { BE_URL } from "../utils/const";

interface Video {
  _id: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  thumbnailUrl: string;
}

interface Comment {
  _id: string;
  text: string;
  parentId: string | null;
}

interface Note {
  _id: string;
  text: string;
  tags: string[];
}

const Dashboard = () => {
  const { token, setToken } = useContext(AuthContext);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [commentText, setCommentText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteTags, setNoteTags] = useState("");

  const api = axios.create({
    baseURL: BE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, [token]);

  const loadDetails = async (video: Video) => {
    setSelectedVideo(video);
    try {
      const commentsRes = await api.get(`/comments?videoId=${video._id}`);
      setComments(commentsRes.data);

      const notesRes = await api.get(`/notes?videoId=${video._id}`);
      setNotes(notesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !selectedVideo) return;
    try {
      await api.post("/comments", { videoId: selectedVideo._id, text: commentText });
      setCommentText("");
      loadDetails(selectedVideo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim() || !selectedVideo) return;
    try {
      const tagsArray = noteTags.split(",").map(t => t.trim()).filter(Boolean);
      await api.post("/notes", { videoId: selectedVideo._id, text: noteText, tags: tagsArray });
      setNoteText("");
      setNoteTags("");
      loadDetails(selectedVideo);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">YouTube Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
      </header>

      <main className="flex flex-1">
        <section className="w-1/3 overflow-auto border-r border-gray-300 p-4">
          <h2 className="text-lg font-semibold mb-4">Videos</h2>
          {videos.map(video => (
            <div
              key={video._id}
              onClick={() => loadDetails(video)}
              className={`cursor-pointer p-2 rounded mb-2 ${selectedVideo?._id === video._id ? "bg-blue-100" : ""}`}
            >
              <img src={video.thumbnailUrl} alt={video.title} className="w-full rounded mb-1" />
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.channelTitle}</p>
            </div>
          ))}
        </section>

        <section className="flex-1 p-6 overflow-auto">
          {!selectedVideo ? (
            <p>Select a video to see details</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedVideo.title}</h2>

              {/* Comments */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                <div className="mb-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                  <button
                    onClick={handleAddComment}
                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Add Comment
                  </button>
                </div>
                <ul>
                  {comments.map(comment => (
                    <li key={comment._id} className="border-b border-gray-300 py-1">{comment.text}</li>
                  ))}
                </ul>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Notes</h3>
                <div className="mb-2">
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={noteTags}
                    onChange={e => setNoteTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                  />
                  <button
                    onClick={handleAddNote}
                    className="bg-green-600text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Add Note
                  </button>
                </div>
                <ul>
                  {notes.map(note => (
                    <li key={note._id} className="border-b border-gray-300 py-1">
                      <p>{note.text}</p>
                      <p className="text-sm text-gray-500">
                        Tags: {note.tags.join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
