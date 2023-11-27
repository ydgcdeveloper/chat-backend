/*
  Warnings:

  - You are about to drop the column `timestamp` on the `ChatMessage` table. All the data in the column will be lost.
  - Made the column `text` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "timestamp",
ALTER COLUMN "text" SET NOT NULL,
ALTER COLUMN "attachment" DROP NOT NULL,
ALTER COLUMN "reactions" DROP NOT NULL,
ALTER COLUMN "forwardedFrom" DROP NOT NULL,
ALTER COLUMN "replyTo" DROP NOT NULL;
