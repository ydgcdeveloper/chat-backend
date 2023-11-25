/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "chatId" INTEGER,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "joinedDate" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "sender" TEXT,
    "senderId" INTEGER NOT NULL,
    "timestamp" DOUBLE PRECISION NOT NULL,
    "status" TEXT,
    "attachment" JSONB NOT NULL,
    "reactions" JSONB NOT NULL,
    "forwardedFrom" INTEGER NOT NULL,
    "replyTo" JSONB NOT NULL,
    "chatId" INTEGER,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
