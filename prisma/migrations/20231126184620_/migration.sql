-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_lastMessageId_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "lastMessageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "ChatMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
