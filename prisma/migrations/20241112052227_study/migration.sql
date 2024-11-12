-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "studyName" TEXT NOT NULL,
    "introduce" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "background" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);
