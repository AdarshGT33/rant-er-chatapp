import Messages from '../models/messagesModel.js'

export const getMessages = async (req, res, next) => {
    try {
      const user1 = req.userId
      const user2 = req.body.id;
  
      if (!user1 || !user2) {
        return res.status(400).send("Users are required");
      }
  
      const messages = await Messages.find({
        $or: [
            {sender: user1, recepient: user2},
            {sender: user2, recepient: user1}
        ]
      }).sort({timestamp: 1})
  
      return res.status(200).json({ messages });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error at logout");
    }
  };
  