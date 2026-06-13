import { Request, Response } from "express";
import { ConversationServices } from "./conversation.service";
import status from "http-status";

const createOrGetDirectConversation = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;

    const userId = (req as any).user?.id;

    const conversation =
      await ConversationServices.createOrGetDirectConversation(
        userId,
        receiverId,
      );

    return res.status(status.OK).json({
      success: true,
      data: conversation,
    });
  } catch (error: any) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getConversationList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id!;

    const result = await ConversationServices.getConversationList(userId);

    return res.status(status.OK).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const ConversationControllers = {
  createOrGetDirectConversation,
  getConversationList,
};
