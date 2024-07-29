-- CreateTable
CREATE TABLE "Watch" (
    "address" TEXT[],
    "authorAddress" TEXT NOT NULL,

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("authorAddress")
);
