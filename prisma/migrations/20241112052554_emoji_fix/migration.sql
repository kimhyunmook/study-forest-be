/*
  Warnings:

  - You are about to drop the column `emogis` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "emogis",
ADD COLUMN     "emojis" TEXT[];
