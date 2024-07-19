import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useParams, useSearchParams } from "react-router-dom";
import VideoPreview from "./VideoPreview";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setVideos(json.items);
  };

  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="md:flex md:flex-row flex flex-col md:flex-wrap md:justify-center gap-20  md:w-full md:mt-4 mx-3 ">
      <VideoPreview videoId={videoId} />
      <div>
        <div className="hidden md:block">
          <LiveChat />
        </div>
        <div>
          <div className="flex flex-col">
            {videos.map((video) => (
              <Link to={"/watch?v=" + video.id}>
                <VideoCard key={video.id} info={video} videoId={videoId} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
