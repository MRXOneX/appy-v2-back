-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "designId" INTEGER,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE SET NULL ON UPDATE CASCADE;
