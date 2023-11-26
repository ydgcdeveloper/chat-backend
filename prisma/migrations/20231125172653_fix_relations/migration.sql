/*
  Warnings:

  - You are about to drop the column `channelId` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the `_ChannelToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[channelId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_channelId_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToUser" DROP CONSTRAINT "_ChannelToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToUser" DROP CONSTRAINT "_ChannelToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "channelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "channelId";

-- DropTable
DROP TABLE "_ChannelToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Chat_channelId_key" ON "Chat"("channelId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
