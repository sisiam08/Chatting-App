import { Request, Response } from "express";
import { MessageServices } from "./message.service";
import { MessageType } from "../../generated/prisma/enums";
import { broadcastNewMessage } from "./message.helper";
import status from "http-status";
import createAppError from "../../errors/appError";

const sendFileMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user?.id!;
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: "File cannot found!",
        data: null,
      });
    }

    const isImage = file.mimetype.startsWith("image/");
    const messageType = isImage ? MessageType.IMAGE : MessageType.FILE;

    const message = await MessageServices.sendMessage({
      conversationId,
      userId,
      content: (file as any).path || (file as any).url,
      type: messageType,
      fileName: file.originalname,
      fileSize: file.size,
    });

    await broadcastNewMessage(conversationId, userId, message);

    return res.status(status.OK).json({
      success: true,
      message: "File message sent successfully",
      data: message,
    });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send message",
      data: null,
    });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { participantId } = req.params;

    if (!participantId || typeof participantId !== "string") {
      createAppError("Participant not found", status.BAD_REQUEST);
      return;
    }

    const userId = req.user?.id!;

    const cursor = req.query.cursor as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await MessageServices.getMessages(
      userId,
      participantId,
      cursor,
      limit,
    );

    return res.status(status.OK).json({
      success: true,
      message: "Messages retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve messages",
      data: null,
    });
  }
};

export const MessageControllers = {
  sendFileMessage,
  getMessages,
};
