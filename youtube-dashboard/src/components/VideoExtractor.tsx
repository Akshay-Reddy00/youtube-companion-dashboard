import { useState, useContext } from "react";
import axios from "axios";
import { BE_URL } from "../utils/const";
import { Button } from "./Button";
import { AuthContext } from "../context/authContext";

// Type for the video data returned by YouTube API
interface FetchedVideo {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  embedHtml: string;
  videoUrl: string;
}

// Type for the video saved in MongoDB backend
interface SavedVideo {
  _id: string;
  videoId: string;
  title: string;
  description?: string;
  createdAt?: string;
}

// Props for VideoFetcher component
interface VideoFetcherProps {
  onVideoFetched?: (video: any) => void;
}

export const VideoFetcher = ({ onVideoFetched }: VideoFetcherProps) => {
  const { token } = useContext(AuthContext);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [videoData, setVideoData] = useState<FetchedVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchVideo = async () => {
    if (!youtubeUrl.trim()) return;

    try {
      setLoading(true);
      setError("");

      // Fetch video details from YouTube API
      const res = await axios.get<FetchedVideo>(`${BE_URL}/videos/public/details`, {
        params: { url: youtubeUrl },
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedVideo = res.data;
      setVideoData(fetchedVideo);

      // Auto-save to MongoDB backend
      const saveRes = await axios.post<SavedVideo>(`${BE_URL}/videos`, {
        videoId: fetchedVideo.videoId,
        title: fetchedVideo.title,
        description: fetchedVideo.author,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Pass saved video (_id)
      onVideoFetched?.(saveRes.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch or save video. Please check the link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-3">Add YouTube Video</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Paste YouTube link here..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="flex-1 border border-gray-300 rounded p-2"
        />
        <Button
          label={loading ? "Loading..." : "Fetch & Save"}
          onClick={fetchVideo}
          className="w-auto"
        />
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {videoData && (
        <div className="mt-4">
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: videoData.embedHtml }}
          />
          <h3 className="font-bold text-xl">{videoData.title}</h3>
          <p className="text-gray-600">By {videoData.author}</p>
          <img
            src={videoData.thumbnail}
            alt={videoData.title}
            className="rounded mt-2 w-48"
          />
        </div>
      )}
    </div>
  );
};
