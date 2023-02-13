/*
  Warnings:

  - Made the column `userId` on table `TrackTime` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TrackTime" DROP CONSTRAINT "TrackTime_userId_fkey";

-- AlterTable
ALTER TABLE "TrackTime" ALTER COLUMN "time" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TrackTime" ADD CONSTRAINT "TrackTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
