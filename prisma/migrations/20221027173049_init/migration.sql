-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackTimes" (
    "id" SERIAL NOT NULL,
    "game" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicle" TEXT NOT NULL,

    CONSTRAINT "TrackTimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrackTimes" ADD CONSTRAINT "TrackTimes_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
