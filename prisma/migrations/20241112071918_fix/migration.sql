/*
  Warnings:

  - You are about to drop the column `emojis` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "emojis";

-- CreateTable
CREATE TABLE "Emojis" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "Emojis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Emojis" ADD CONSTRAINT "Emojis_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
