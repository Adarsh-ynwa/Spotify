import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAllStats = async (req, res, next) => {
  try {
    const [totalUsers, totalAlbums, totalSongs] = await Promise.all([
      User.countDocuments(),
      Album.countDocuments(),
      Song.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        {
          $group: {
            _id: "$artist",
          },
        },
        {
          $count: "count",
        },
      ]),
    ]);
  } catch (error) {
    next(error);
  }
};

