-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "canvasWidth" INTEGER NOT NULL DEFAULT 300,
    "canvasHeight" INTEGER NOT NULL DEFAULT 500,
    "elements" VARCHAR(5000) NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);
