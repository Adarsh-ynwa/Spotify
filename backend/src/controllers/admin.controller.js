import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary=async(file)=>{
   try {
      const result=await cloudinary.uploader.upload(file.tempFilePath,{
         resource_type:"auto",
      })
      return result.secure_url;
   } catch (error) {
      console.log("error uploading to cloudinary",error)
      throw new Error("Error uploading to cloudinary")
   }

}

export const createSong=async(req,res,next)=>{
   try {
      if(!req.files||!req.files.audioFile||!req.files.imageFile){
         return res.status(400).json({
            message:"Please upload all the files"
         })
      }

      const{title,artist,duration,albumId}=req.body
      const audioFile=req.files.audioFile
      const imageFile=req.files.imageFile

      const audioUrl=uploadToCloudinary(audioFile)
      const imageUrl=uploadToCloudinary(imageFile)

      const song= new Song({
         title,
         artist,
         audioUrl,
         imageUrl,
         duration,
         albumId:albumId||null
      })
      //if there is an album id it means that the song belong  to an album so update the album with the song as well
      if(albumId){
         await Album.findByIdAndUpdate(albumId,{
            $push:{songs:song._id},
         })
      }
      res.status(201).json(song)
      
   } catch (error) {
      console.log("error in creating song",error)
      next(error)
      
   }
}

export const deleteSong=async(req,res,next)=>{
   try {
      const{id}=req.params
      const songToDelete=await Song.findById(id)

     if(song.albumId){
      await Album.findByIdAndUpdate(songToDelete.albumId,{
         $pull:{songs:songToDelete._id},
      })
     }

     await Song.findByIdAndDelete(id)

     res.status(200).json({message:"Song deleted Successfully "})
      
   } catch (error) {
      console.log("error in deleting the song",error)
      next(error)
      
   }
}

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};
export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};