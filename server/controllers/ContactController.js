import mongoose from "mongoose";
import User from "../models/userModel.js";
import Messages from "../models/messagesModel.js";

export const searchContacts = async (req, res, next) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm == undefined || searchTerm == null) {
      return res.status(400).send("SearchTerm is required.");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .send("Internal Server Error while searching contacts");
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    let { userId } = req;

    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Messages.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recepient: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recepient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { timestamp: -1 },
      },
    ]);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .send("Internal Server Error while getting all contacts");
  }
};

export const getAllLogedInUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.userId } },
      "firstName lastName _id email"
    );

    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      value: user._id
    }));

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .send("Internal Server Error while getting all logged in users");
  }
};
