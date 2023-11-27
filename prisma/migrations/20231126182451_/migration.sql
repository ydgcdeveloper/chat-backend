/*
  Warnings:

  - A unique constraint covering the columns `[lastMessageId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastMessageId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "lastMessageId" INTEGER NOT NULL,
ADD COLUMN     "unreadMessages" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastConnection" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_lastMessageId_key" ON "Chat"("lastMessageId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "ChatMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
