/*
  Warnings:

  - Added the required column `typeFile` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeFile" AS ENUM ('pdf', 'png', 'jpg');

-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "typeFile" "TypeFile" NOT NULL,
ALTER COLUMN "elements" DROP NOT NULL,
ALTER COLUMN "elements" SET DATA TYPE VARCHAR(100000);
