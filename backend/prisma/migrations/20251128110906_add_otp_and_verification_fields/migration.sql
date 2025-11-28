-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobileVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpires" TIMESTAMP(3);
