/*
  Warnings:

  - You are about to drop the column `authKey` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "authKey";

-- CreateTable
CREATE TABLE "AuthKey" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthKey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
