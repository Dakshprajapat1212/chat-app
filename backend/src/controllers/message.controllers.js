import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Ensure 'user' is lowercase
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({

            $or:[
                {senderId:myId, receiverId:userToChatId},
                {receiverId:myId, senderId:userToChatId}
            ]
        });
        res.status(200).json(messages);
    }
    catch(error){
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const sendMessage= async(req,res)=>{
  try {
    
     const {text,image}= req.body;
     const {id:receiverId}=req.params;
     const senderId=req.user._id;

     let imageUrl;
     if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
     }
     const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageUrl
     });
     await newMessage.save();
     res.status(201).json(newMessage);

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
