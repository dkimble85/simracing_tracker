/*
  Warnings:

  - Made the column `vehicleClass` on table `TrackTime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TrackTime" ALTER COLUMN "vehicleClass" SET NOT NULL;
