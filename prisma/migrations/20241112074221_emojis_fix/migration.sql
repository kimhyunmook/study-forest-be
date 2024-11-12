/*
  Warnings:

  - You are about to drop the column `type` on the `Emojis` table. All the data in the column will be lost.
  - Added the required column `emojiIcon` to the `Emojis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emojis" DROP COLUMN "type",
ADD COLUMN     "emojiIcon" TEXT NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 0;
