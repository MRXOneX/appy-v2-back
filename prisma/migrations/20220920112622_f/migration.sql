/*
  Warnings:

  - You are about to drop the column `name` on the `Design` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled';
