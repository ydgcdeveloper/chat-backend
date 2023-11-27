/*
  Warnings:

  - You are about to drop the column `sender` on the `ChatMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId]` on the table `ChatMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverId]` on the table `ChatMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "sender",
ADD COLUMN     "receiverId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessage_senderId_key" ON "ChatMessage"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessage_receiverId_key" ON "ChatMessage"("receiverId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
