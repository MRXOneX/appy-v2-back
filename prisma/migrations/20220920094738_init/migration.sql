-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Untitled',

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "fill" TEXT NOT NULL,
    "text" TEXT,
    "fontFamily" TEXT,
    "fontStyle" TEXT,
    "image" TEXT,
    "designId" INTEGER,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE SET NULL ON UPDATE CASCADE;
