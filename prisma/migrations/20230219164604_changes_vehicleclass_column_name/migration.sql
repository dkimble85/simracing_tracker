/*
  Warnings:

  - You are about to drop the column `vehicle_class` on the `TrackTime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrackTime" DROP COLUMN "vehicle_class",
ADD COLUMN     "vehicleClass" TEXT;
